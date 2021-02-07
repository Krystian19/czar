import { Command } from '../common';
import PlayCommand from './play';
import StopCommand from './stop';
import AuthorCommand from './author';

const cmds: Command[] = [
  PlayCommand,
  StopCommand,
  AuthorCommand,
];

export default cmds;
