import { useState, useEffect, useRef } from "react";
import styles from "./InstallDependencies.module.scss";

interface InstallDependenciesProps {
  onRemove: () => void;
}

const REQUIRED_COMMANDS = ["npm uninstall node-sass", "npm install sass"];

export const InstallDependencies = ({ onRemove }: InstallDependenciesProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [currentCommand, setCurrentCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  const errorLines = [
    "$ npm install",
    "npm WARN EBADENGINE Unsupported engine {",
    "npm WARN EBADENGINE   package: 'node-sass@4.14.1',",
    "npm WARN EBADENGINE   required: { node: '^14.0.0' },",
    "npm WARN EBADENGINE   current: { node: 'v16.14.0', npm: '8.3.1' }",
    "npm WARN EBADENGINE }",
    "npm WARN deprecated request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142",
    "npm WARN deprecated har-validator@5.1.5: this library is no longer supported",
    "npm WARN deprecated uuid@3.4.0: Please upgrade to version 7 or higher. Older versions may use Math.random() in certain circumstances, which is known to be problematic.",
    "npm WARN deprecated fsevents@1.2.13: fsevents 1 will break on node v14+ and could be using insecure binaries. Upgrade to fsevents 2.",
    "npm WARN deprecated resolve-url@0.2.1: https://github.com/lydell/resolve-url#deprecated",
    "npm WARN deprecated urix@0.1.0: Please see https://github.com/lydell/urix#deprecated",
    "",
    "> node-sass@4.14.1 install /Users/user/project/node_modules/node-sass",
    "> node scripts/install.js",
    "",
    "Unable to proceed with compilation of node-sass.",
    "Multiple errors were encountered while setting up the build environment:",
    "",
    "gyp ERR! find Python",
    'gyp ERR! find Python checking Python explicitly set from command line or npm configuration',
    'gyp ERR! find Python - "--python" is not set from command line or npm configuration',
    'gyp ERR! find Python checking if "python3" can be used',
    'gyp ERR! find Python - "python3" is not in PATH or produced an error',
    'gyp ERR! find Python checking if "python" can be used',
    'gyp ERR! find Python - "python" is not in PATH or produced an error',
    'gyp ERR! find Python checking if Python is C:\\Python37\\python.exe',
    'gyp ERR! find Python - "C:\\Python37\\python.exe" is not in PATH or produced an error',
    'gyp ERR! find Python checking if Python is C:\\Python39\\python.exe',
    'gyp ERR! find Python - "C:\\Python39\\python.exe" is not in PATH or produced an error',
    "gyp ERR! find Python",
    "gyp ERR! find Python **********************************************************",
    "gyp ERR! find Python You need to install the latest version of Python.",
    "gyp ERR! find Python Node-gyp should be able to find and use Python. If not,",
    "gyp ERR! find Python you can try one of the following options:",
    "gyp ERR! find Python - Use the switch --python=\"/path/to/pythonexecutable\"",
    "gyp ERR! find Python   (accepted by both node-gyp and npm)",
    "gyp ERR! find Python - Set the environment variable PYTHON",
    "gyp ERR! find Python - Set the npm configuration variable python:",
    "gyp ERR! find Python   npm config set python \"/path/to/pythonexecutable\"",
    "gyp ERR! find Python For more information consult the documentation at:",
    "gyp ERR! find Python https://github.com/nodejs/node-gyp#installation",
    "gyp ERR! find Python **********************************************************",
    "",
    "gyp ERR! configure error",
    'gyp ERR! stack Error: Command failed: /usr/local/bin/python3 -c import sys; print "%s.%s.%s" % sys.version_info[:3];',
    "gyp ERR! stack /bin/sh: /usr/local/bin/python3: No such file or directory",
    "gyp ERR! stack     at ChildProcess.exithandler (child_process.js:390:12)",
    "gyp ERR! stack     at ChildProcess.emit (events.js:400:28)",
    "gyp ERR! stack     at maybeClose (internal/child_process.js:1088:16)",
    "gyp ERR! stack     at Socket.<anonymous> (internal/child_process.js:451:11)",
    "gyp ERR! stack     at Socket.emit (events.js:388:22)",
    "gyp ERR! stack     at Pipe.<anonymous> (net.js:687:12)",
    "gyp ERR! System Darwin 21.6.0",
    'gyp ERR! command "/usr/local/bin/node" "/Users/user/project/node_modules/node-gyp/bin/node-gyp.js" "rebuild"',
    "gyp ERR! cwd /Users/user/project/node_modules/node-sass",
    "gyp ERR! node -v v16.14.0",
    "gyp ERR! node-gyp -v v3.8.0",
    "gyp ERR! not ok",
    "",
    "Build failed with error code: 1",
    "",
    "npm ERR! code ELIFECYCLE",
    "npm ERR! errno 1",
    "npm ERR! node-sass@4.14.1 install: `node scripts/install.js`",
    "npm ERR! Exit status 1",
    "npm ERR!",
    "npm ERR! Failed at the node-sass@4.14.1 install script.",
    "npm ERR! This is probably not a problem with npm. There is likely additional logging output above.",
    "",
    "npm ERR! A complete log of this run can be found in:",
    "npm ERR!     /Users/user/.npm/_logs/2025-02-07T10_18_48_123Z-debug.log",
    "",
    "npm ERR! Some dependencies have not been installed correctly.",
    "npm ERR! Please review the error messages above and try again.",
    "",
    "npm ERR! Common solutions:",
    "npm ERR! - Make sure you have Python installed and accessible in your PATH",
    "npm ERR! - Check that your Node.js version is compatible with node-sass",
    "npm ERR! - Try clearing your npm cache: npm cache clean --force",
    "npm ERR! - If using Windows, ensure you have windows-build-tools installed",
    "",
    "npm ERR! Need help? Visit: https://github.com/sass/node-sass/issues",
  ];

  const solutionLines = [
    "",
    "To resolve this issue, you need to replace node-sass with the newer Dart Sass implementation.",
    "First uninstall node-sass, then install sass:",
    "",
    "Type the following commands:",
    "",
    "1. npm uninstall node-sass",
    "2. npm install sass",
    "",
  ];

  useEffect(() => {
    // Animate error lines appearing
    const timer = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev >= errorLines.length - 1) {
          clearInterval(timer);
          setTimeout(() => setShowSolution(true), 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when new content is added
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [currentLine, commandHistory, currentCommand]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentCommand.trim()) {
      const command = currentCommand.trim();

      // Add command to history
      setCommandHistory((prev) => [...prev, command]);

      // Check if command matches required command
      if (command === REQUIRED_COMMANDS[currentCommandIndex]) {
        setCurrentCommandIndex((prev) => prev + 1);

        // If all commands are entered correctly, remove after a delay
        if (currentCommandIndex === REQUIRED_COMMANDS.length - 1) {
          setTimeout(onRemove, 200);
        }
      }

      setCurrentCommand("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      // Navigate command history
      if (commandHistory.length > 0) {
        const lastCommand = commandHistory[commandHistory.length - 1];
        setCurrentCommand(lastCommand);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple tab completion
      const currentRequired = REQUIRED_COMMANDS[currentCommandIndex];
      if (currentRequired?.startsWith(currentCommand)) {
        setCurrentCommand(currentRequired);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCommand(e.target.value);
  };

  return (
    <div className={styles.container} tabIndex={0}>
      <div className={styles.titleBar}>
        <div className={styles.buttons}>
          <div className={`${styles.button} ${styles.close}`} />
          <div className={`${styles.button} ${styles.minimize}`} />
          <div className={`${styles.button} ${styles.maximize}`} />
        </div>
        <div className={styles.title}>user — npm install — -zsh — 80×24</div>
      </div>
      <div className={styles.terminal} ref={terminalRef}>
        <div className={styles.content}>
          {errorLines.slice(0, currentLine + 1).map((line, i) => (
            <div key={i} className={styles.line}>
              {line.startsWith("$") ? (
                <>
                  <span className={styles.prompt}>➜ project git:(main) </span>
                  {line}
                </>
              ) : (
                <span className={line.includes("ERR!") ? styles.error : ""}>
                  {line}
                </span>
              )}
            </div>
          ))}
          {showSolution && (
            <div className={styles.solution}>
              {solutionLines.map((line, i) => (
                <div key={`solution-${i}`} className={styles.line}>
                  {line}
                </div>
              ))}
              {/* Command History */}
              {commandHistory.map((cmd, i) => (
                <div key={`history-${i}`} className={styles.line}>
                  <span className={styles.prompt}>➜ project git:(main) </span>
                  <span className={styles.command}>{cmd}</span>
                </div>
              ))}
              {/* Current Command Input */}
              <div className={styles.line}>
                <span className={styles.prompt}>➜ project git:(main) </span>
                <input
                  type="text"
                  className={styles.commandInput}
                  value={currentCommand}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  spellCheck={false}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
