// @flow
import express from 'express';
import { spawn } from 'child_process';

/**
 * Express router containing task methods.
 */
const router: express$Router<> = express.Router();

router.post('/cmd', (request, response) => {
  const command = request.body.command;
  let stdout = '';
  let stderr = '';
  const run = spawn('docker', ['run', '--rm', 'node-image', 'node', '-e', command]);

  run.stdout.on('data', (data) => {
    stdout = data.toString();
  });

  run.stderr.on('data', (data) => {
    stderr = data.toString();

  });

  run.on('close', (code) => {
    response.send({ stdout: stdout, stderr: stderr, code: code });
  });
});

export default router;
