import { useEffect, useRef, useState } from "react";
const axios = require("axios").default;
import {
  Message,
  AddPlayerMessage,
  Player,
  ChatGptResponse,
  DoodleAssignment,
} from "@/types/doodler";
import StartGame from "@/components/doodler/presenter/StartGame";
import Spinner from "@/components/doodler/Spinner";
import NavBar from "@/components/NavBar/NavBar";
import CreateAssignmentDoodles from "@/components/doodler/presenter/CreateAssignmentDoodles";
import FirstGuess from "@/components/doodler/presenter/FirstGuess";
import SecondGuess from "@/components/doodler/presenter/SecondGuess";
import Results from "@/components/doodler/presenter/Results";
import { PresenterComponent, MessageType } from "@/enums/doodler";

export default function Doodler() {
  const sendMessageAction = "sendmessage";
  // const PLAYER_ADDRESS = 'http://localhost:3000/doodler'; //locally
  const PLAYER_ADDRESS = "https://natewidmer.com/doodler"; //production
  const WS_ADDRESS =
    "wss://qqhbc125y4.execute-api.us-east-2.amazonaws.com/production/";
  const GET_ASSIGNMENTS_LAMBDA =
    "https://v8938chp5f.execute-api.us-east-2.amazonaws.com/production/getChatGptAssignments/";

  const [_players, _setPlayers] = useState<Player[]>([]);
  const playersRef = useRef(_players);
  const setPlayers = (updatedPlayers: Player[]) => {
    playersRef.current = updatedPlayers;
    _setPlayers(updatedPlayers);
  };
  const [options, setOptions] = useState(new Array<string>());
  var hasConstructed = false;
  const [_gameId, _setGameId] = useState("-1");
  const gameIdRef = useRef(_gameId);
  const setGameId = (newGameId: string) => {
    gameIdRef.current = newGameId;
    _setGameId(newGameId);
  };
  const newPlayerLink = `${PLAYER_ADDRESS}/${gameIdRef.current}/player`;
  const [playerAssignmentIndex, setPlayerAssignmentIndex] = useState(-1);
  const [component, setComponent] = useState(PresenterComponent.LoadingGame);
  const [loading, setLoading] = useState(true);
  const [resultsMessage, setResultsMessage] = useState(
    "That was a great round!"
  );
  const ws = useRef<WebSocket>();
  var nextNewPlayerIndex = useRef(0);

  useEffect(() => {
    if (!hasConstructed) {
      hasConstructed = true;
      ws.current = new WebSocket(WS_ADDRESS);
      ws.current.onerror = (err) => console.error(err);
      ws.current.onopen = (event) => {
        sendMessageToGetGameIdResponse();
      };
      ws.current.onmessage = (msg: any) => handleServerMessage(msg.data);
    }
  }, []);

  function handleServerMessage(msg: string) {
    if (msg) {
      const msgAsJson = JSON.parse(msg);
      const message = msgAsJson as Message;
      if (gameIdRef.current && gameIdRef.current !== message.recipientConnectionId) {
        console.log(
          `setting game id. messagetype:${message.type} old gameId:${gameIdRef.current} new gameId:${message.recipientConnectionId}`
        );
        setGameId(message.recipientConnectionId);
        setComponent(PresenterComponent.StartGame);
        setLoading(false);
      }

      if (message.type === MessageType.AddPlayer) {
        const addPlayerMessage = JSON.parse(message.value) as AddPlayerMessage;
        addPlayer(addPlayerMessage, message.senderConnectionId);
      } else if (message.type === MessageType.SubmitAssignmentDoodle) {
        submitAssignmentDoodle(message);
      } else if (message.type === MessageType.SubmitFirstGuess) {
        submitFirstGuess(message);
      } else if (message.type === MessageType.SubmitSecondGuess) {
        submitSecondGuess(message);
      }
    }
  }

  function addPlayer(message: AddPlayerMessage, playerConnectionId: string) {
    var newPlayer = {
      connectionId: playerConnectionId,
      name: message.name,
      pictureURL: message.imageUrl,
      score: 0,
    } as Player;
    console.log(
      `added ${message.name} with playerid: ${nextNewPlayerIndex.current}`
    );
    nextNewPlayerIndex.current++;
    setPlayers([...playersRef.current, newPlayer]);
  }

  function submitAssignmentDoodle(message: Message) {
    var players = new Array<Player>();
    playersRef.current.forEach((player) => {
      if (player.connectionId === message.senderConnectionId) {
        player.assignment.drawingURL = message.value;
      }

      players.push(player);
    });

    setPlayers(players);
  }

  function submitFirstGuess(message: Message) {
    var players = new Array<Player>();
    playersRef.current.forEach((player) => {
      if (player.connectionId === message.senderConnectionId)
        player.firstGuess = message.value;

      players.push(player);
    });

    setPlayers(players);
    var logMsg = "got first guess from playerId:" + message.senderConnectionId;
    console.log(logMsg);
  }

  function submitSecondGuess(message: Message) {
    var players = new Array<Player>();
    playersRef.current.forEach((player) => {
      if (player.connectionId === message.senderConnectionId)
        player.secondGuess = message.value;

      players.push(player);
    });

    setPlayers(players);
    var logMsg = "got second guess from playerId:" + message.senderConnectionId;
  }

  async function createDoodles() {
    if (playersRef.current.length > 1) {
      setLoading(true);
      axios
        .get(`${GET_ASSIGNMENTS_LAMBDA}${playersRef.current.length}`, {
          signal: AbortSignal.timeout(10000),
        })
        .then(function (response: any) {
          let chatGptResponse = response.data as ChatGptResponse;
          if (chatGptResponse.success) {
            var updatedPlayers = new Array<Player>();
            var assignmentIndex = 0;
            playersRef.current.forEach(async (player) => {
              var newPlayer = askPlayerToCreateDoodle(
                player,
                chatGptResponse.contentList[assignmentIndex]
              );
              updatedPlayers.push(newPlayer);
              ++assignmentIndex;
            });

            setPlayers(updatedPlayers);
            setComponent(PresenterComponent.CreateAssignment);
            setLoading(false);
          } else {
            console.log("gpt response returned not success");
          }
        })
        .catch(function (error: any) {
          console.log(
            `issue getting drawing description from server: ${JSON.stringify(
              error
            )}`
          );
          //how should I notify the user or try again
        });
    }
  }

  function askPlayerToCreateDoodle(player: Player, drawingDescription: string) {
    var doodleAssignment: DoodleAssignment = {
      assignment: drawingDescription,
      drawingURL: "",
    };
    var newPlayer = {
      connectionId: player.connectionId,
      name: player.name,
      pictureURL: player.pictureURL,
      assignment: doodleAssignment,
      score: player.score,
    } as Player;
    sendMessage(
      MessageType.CreateDoodle,
      newPlayer.connectionId,
      doodleAssignment.assignment
    );

    return newPlayer;
  }

  function goToNextPlayerAssignment() {
    setComponent(PresenterComponent.FirstGuess);
    console.log("in GoToNextPlayerAssignment");
    var index = playerAssignmentIndex + 1;
    var playerAssignmentConnectionId = playersRef.current[index].connectionId;
    var assignmentIndexMsg =
      "player assignment connectionId: " + playerAssignmentConnectionId;
    console.log(assignmentIndexMsg);
    setPlayerAssignmentIndex(index);
    var updatedPlayers = playersRef.current;
    updatedPlayers.forEach((player) => {
      player.firstGuess = "";
      player.secondGuess = "";
    });
    setPlayers(updatedPlayers);

    playersRef.current.forEach((player) => {
      if (player.connectionId === playerAssignmentConnectionId) {
        var logMsg =
          "player connectionId: " +
          player.connectionId +
          " is waiting for others to guess";
        console.log(logMsg);
        sendMessage(
          MessageType.WaitingForOtherPlayers,
          player.connectionId,
          ""
        );
      } else {
        var logMsg =
          "player connectionId: " +
          player.connectionId +
          " is about to make their first guess";
        console.log(logMsg);
        sendMessage(MessageType.MakeAGuess, player.connectionId, "");
      }
    });
  }

  function finishFirstGuess() {
    setComponent(PresenterComponent.SecondGuess);
    console.log("in FinishFirstGuess");
    var playerAssignmentConnectionId =
      playersRef.current[playerAssignmentIndex].connectionId;
    var updatedOptions = new Array<string>();
    playersRef.current.forEach((player) => {
      if (player.firstGuess) updatedOptions.push(player.firstGuess);
    });
    var curAssignment = playersRef.current[playerAssignmentIndex].assignment;
    var randomIndex = Math.floor(Math.random() * updatedOptions.length);
    updatedOptions.splice(randomIndex, 0, curAssignment.assignment);
    setOptions(updatedOptions);
    var updatedOptionsString = JSON.stringify(updatedOptions);
    playersRef.current.forEach((player) => {
      if (player.connectionId !== playerAssignmentConnectionId) {
        var logMsg =
          "player connectionId: " +
          player.connectionId +
          " is about to make their second guess";
        console.log(logMsg);
        sendMessage(
          MessageType.ChooseYourAnswer,
          player.connectionId,
          updatedOptionsString
        );
      }
    });
  }

  function showResults() {
    if (playerAssignmentIndex == playersRef.current.length - 1)
      setResultsMessage("Here are the final results!");

    setComponent(PresenterComponent.Results);
  }

  function StartNextRound() {
    console.log("in StartNextRound");
    var playerAssignment =
      playersRef.current[playerAssignmentIndex].assignment;
    var updatedPlayers = new Array<Player>();
    playersRef.current.forEach((player) => {
      player.score += getPoints(
        player.firstGuess,
        playerAssignment.assignment
      );
      player.score +=
        player.secondGuess === playerAssignment.assignment ? 100 : 0;
      updatedPlayers.push(player);
    });
    setPlayers(updatedPlayers);
    if (playerAssignmentIndex < playersRef.current.length - 1)
      goToNextPlayerAssignment();
  }

  function getPoints(guess: string, answer: string) {
    var points = 0;
    let guessWords = stringToSet(guess);
    let answerWords = stringToSet(answer);
    guessWords.forEach((word) => {
      if (answerWords.has(word)) {
        points += 5;
      }
    });

    return points;
  }

  function stringToSet(s: string) {
    var words = s.split(" ");
    var set = new Set();
    words.forEach((word) => {
      set.add(word);
    });

    return set;
  }

  function sendMessage(
    type: MessageType,
    recipientConnectionId: string,
    value: string
  ) {
    var msg = {
      action: sendMessageAction,
      type: type,
      recipientConnectionId: recipientConnectionId,
      senderConnectionId: "",
      value: value,
    } as Message;
    var jsonRequest = JSON.stringify(msg);
    if (ws.current !== undefined) {
      ws.current.send(jsonRequest);
    }
  }

  function sendMessageToGetGameIdResponse() {
    var msg = {
      action: sendMessageAction,
      type: MessageType.GameId,
      recipientConnectionId: "",
      senderConnectionId: "",
      value: "",
    } as Message;
    var jsonRequest = JSON.stringify(msg);
    if (ws.current !== undefined) {
      ws.current.send(jsonRequest);
    }
  }

  return (
    <div>
      <NavBar />
      {loading && <Spinner message="loading..." />}
      {!loading && component === PresenterComponent.StartGame && (
        <StartGame
          gameId={gameIdRef.current}
          action={createDoodles}
          players={playersRef.current}
          newPlayerLink={newPlayerLink}
        />
      )}
      {!loading && component === PresenterComponent.CreateAssignment && (
        <CreateAssignmentDoodles
          action={goToNextPlayerAssignment}
          players={playersRef.current}
        />
      )}
      {!loading && component === PresenterComponent.FirstGuess && (
        <FirstGuess
          action={finishFirstGuess}
          players={playersRef.current}
          playerAssignmentIndex={playerAssignmentIndex}
        />
      )}
      {!loading && component === PresenterComponent.SecondGuess && (
        <SecondGuess
          action={showResults}
          players={playersRef.current}
          playerAssignmentIndex={playerAssignmentIndex}
        />
      )}
      {!loading && component === PresenterComponent.Results && (
        <Results
          action={StartNextRound}
          message={resultsMessage}
          players={playersRef.current}
          playerAssignmentIndex={playerAssignmentIndex}
        />
      )}
    </div>
  );
}
