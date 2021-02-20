import { Command } from '../common';
import AuthorCommand from './author';
import HelpCommand from './help';
import PlayCommand from './play';
import StopCommand from './stop';

const cmds: Command[] = [PlayCommand, StopCommand, AuthorCommand, HelpCommand];

export default cmds;
