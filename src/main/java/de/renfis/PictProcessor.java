package de.renfis;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PictProcessor {

    public String process(String input) {
        return "Processed: [" + input + "]";
    }

}
