export const logger = {
  info: (text: string) => void process.stdout.write(text),
  error: (text: string) => void process.stderr.write(text),
};
