package de.renfis;

import static org.jboss.resteasy.reactive.RestResponse.ResponseBuilder.ok;
import static org.jboss.resteasy.reactive.RestResponse.Status.INTERNAL_SERVER_ERROR;

import java.io.IOException;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import org.jboss.resteasy.reactive.RestResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Path("/pict")
public class PictProcessorResource {

    private final Logger logger = LoggerFactory.getLogger(PictProcessorResource.class);

    @Inject
    PictProcessor pictProcessor;

    @POST
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.TEXT_PLAIN)
    public RestResponse<String> pict(String pictInput) {
        try {
            return ok(pictProcessor.process(pictInput), MediaType.TEXT_PLAIN_TYPE.withCharset("utf-8"))
                    .build();
        } catch (IOException e) {
            logger.error("Error on processing pict input", e);
            return RestResponse.status(INTERNAL_SERVER_ERROR, "Request could not be handled due to an internal error.");
        }
    }

}
