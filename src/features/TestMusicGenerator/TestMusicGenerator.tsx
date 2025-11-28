import React from "react";
import * as Tone from "tone";
import * as scribble from "scribbletune";
import { useNoteTiming } from "../hooks/useNoteTiming";

export interface ClipEvent {
  note: string[];
  length: number;
  level: number;
}

export interface NoteEvent {
  note: string;
  duration: string | number;
  velocity: number;
}

export interface Part {
  time: string;
  event: NoteEvent;
}

const TestMusicGenerator: React.FC = () => {
  const bpm = 120;
  const { ticksToSeconds } = useNoteTiming(bpm, 64);

  const play = async () => {
    await Tone.start();
    Tone.Transport.bpm.value = bpm;

    console.log(scribble.scale("C4 major"));
    const clip: Array<ClipEvent> = scribble.clip({
      // notes: scribble.scale("C4 major"),
      notes: ["C4", "D4", "E4", ["D4", "E4"]],
      //pattern: "x__-x_x[xxx]x_",
      pattern: "x-x_[xx][xxx]",
      accent: "x--",
      // amp: 127,
      // accentLow: 90,
      //sizzle: "sin",
      subdiv: "16n",
    });

    // interface ClipOptions {
    //   notes?: (string | string[])[];
    //   pattern?: string;
    //   accent?: string;
    //   amp?: number;
    //   accentLow?: number;
    //   sizzle?: string;
    //   subdiv?: string;
    // }

    console.log("ticksToSeconds(clip[0].length)");
    console.log(ticksToSeconds(clip[0].length));

    // "16n" - 32
    // "4n" - 64
    // "2n" - 128
    // "1n" - 256

    let currentOffSet = 0;
    let resultArray: Array<Part> = [];
    for (let i = 0; i < clip.length; i++) {
      let currentDurationSec = ticksToSeconds(clip[i].length);
      if (clip[i].note) {
        resultArray.push({
          time: "+" + currentOffSet,
          event: {
            note: clip[i].note.join(" "),
            duration: currentDurationSec,
            velocity: clip[i].level / 100,
          },
        });
      }
      currentOffSet =
        Math.round((currentOffSet + currentDurationSec) * 1000) / 1000;
    }

    console.log("resultArray");
    console.log(resultArray);

    const synth = new Tone.Synth().toDestination();

    // const events = clip
    //   .map((n: { note: any }, i: any) => (n.note ? [`0:${i}`, n.note] : null))
    //   .filter(Boolean);

    // const part = new Tone.Part((time, note) => {
    //   synth.triggerAttackRelease(note as string, "8n", time);
    // }, events);

    var part = new Tone.Part((time, event) => {
      synth.triggerAttackRelease(
        event.event.note,
        event.event.duration,
        event.time,
        event.event.velocity
      );
    }, resultArray);

    // var part = new Tone.Part(
    //   function (time, value) {
    //     //the value is an object which contains both the note and the velocity
    //     synth.triggerAttackRelease(value.note, 0.114, time, value.velocity);
    //   },
    //   [
    //     { time: 0, note: "C3 E3 G4", velocity: 1 },
    //     { time: "0:2", note: "C4", velocity: 0.7 },
    //   ]
    // );

    // ).start(0);
    //synth.triggerAttackRelease(["C4", "E4", "G4"], "2n", "0:0:2", 0.7);

    part.start(0);

    Tone.Transport.start();
  };

  return <button onClick={play}>▶ Играть</button>;
};

export default TestMusicGenerator;
