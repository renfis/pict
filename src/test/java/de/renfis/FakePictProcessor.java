package de.renfis;

import jakarta.enterprise.context.ApplicationScoped;

import io.quarkus.test.Mock;

@Mock
@ApplicationScoped
public class FakePictProcessor extends PictProcessor {

    public static final String PROCESSED_PREFIX = "PROCESSED: ";

    @Override
    public String process(String input) {
        return PROCESSED_PREFIX + input;
    }

}
