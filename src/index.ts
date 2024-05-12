#!/usr/bin/env node

import {spawn} from "node:child_process";
import Utils from "./Utils";

interface Act {
    regex: RegExp,
    action: string
}


if ((process.argv.length % 2) === 0 || process.argv.length < 3)
    throw new Error("Invalid parameter count")

const shell = process.env.SHELL ?? "bash";
const args = process.argv.slice(3);
const acts: Act[] = Utils
    .groupArray(args, 2)
    .map(([exp, action]) => ({
        regex: new RegExp(exp),
        action
    }))

acts.push({
    regex: /END_OF_COMMAND/,
    action: "exit"
})

const shellProc = spawn(shell);

shellProc.stdout.setEncoding("utf-8")
shellProc.stderr.setEncoding("utf-8")
shellProc.on("close", code => `${shell} exited with code ${code}`);
shellProc.stdout.on("data", handleOutput)
shellProc.stderr.on("data", handleOutput)
shellProc.once("spawn", () => {
    cmd(process.argv[2] + "; echo 'END_OF_COMMAND'");
})
function cmd(str: string){
    console.log(`Sending: ${str}`)
    shellProc.stdin.write(str + "\n")
}
function handleOutput(out: string) {
    console.log(out)
    const act = acts.find(({regex}) => regex.test(out));
    if (act)
        cmd(act.action);
}
