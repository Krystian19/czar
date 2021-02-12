import { Command } from '../common';
import PlayCommand from './play';
import StopCommand from './stop';
import AuthorCommand from './author';
import HelpCommand from './help';

const cmds: Command[] = [
  PlayCommand,
  StopCommand,
  AuthorCommand,
  HelpCommand,
];

export default cmds;
