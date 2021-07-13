abstract class Base {
  protected devConsole: Console;

  protected constructor(_filename: string) {
    this.devConsole = console;
  }
}

export { Base };
