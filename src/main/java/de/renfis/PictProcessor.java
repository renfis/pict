package de.renfis;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.function.Function;
import java.util.stream.Collectors;

import jakarta.enterprise.context.ApplicationScoped;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ApplicationScoped
public class PictProcessor {

    private final Logger logger = LoggerFactory.getLogger(PictProcessor.class);

    @ConfigProperty(name = "pict.executable.path")
    String pictPath;

    public String process(String input) throws IOException {
        var path = createTempFile(input);
        var output = executePict(path.toAbsolutePath().toString());

        removeTempFile(path);
        return output;
    }

    private Path createTempFile(String input) throws IOException {
        var path = Files.createTempFile(null, ".pict");
        Files.writeString(path, input);
        return path;
    }

    private String executePict(String inputFile) throws IOException {
        var processBuilder = new ProcessBuilder(pictPath, inputFile);
        var process = processBuilder.start();

        var errors = readLines(process, Process::errorReader);
        return errors.isBlank()
                ? readLines(process, Process::inputReader)
                : errors;
    }

    private String readLines(
            Process process,
            Function<Process, BufferedReader> readerFn) throws IOException {
        try (var reader = readerFn.apply(process)) {
            return reader.lines()
                    .collect(Collectors.joining("\n"));
        }
    }

    private void removeTempFile(Path path) {
        try {
            Files.delete(path);
            logger.debug("Temp file deleted: {}", path);
        } catch (IOException e) {
            logger.error("Could not delete tmp file.", e);
        }
    }

}
