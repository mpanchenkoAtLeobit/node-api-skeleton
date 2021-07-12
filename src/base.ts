abstract class Base {
  protected devConsole: Console;

  protected constructor(filename: string) {
    this.devConsole = console;
  }
}

export { Base };
