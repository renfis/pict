package de.renfis;

import java.io.IOException;

import javax.ws.rs.POST;
import javax.ws.rs.Path;

@Path("/pict")
public class PictProcessorResource {

    @POST
    public String pict(String pictInput) {
        return "Processed: " + pictInput;
    }

}
