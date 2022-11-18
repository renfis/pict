package de.renfis;

import static de.renfis.FakePictProcessor.PROCESSED_PREFIX;
import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

import org.junit.jupiter.api.Test;

import io.quarkus.test.junit.QuarkusTest;

@QuarkusTest
public class PictProcessorResourceTest {

    @Test
    public void testHelloEndpoint() {
        var input = "pict input";
        given()
                .when().body(input).post("/pict")
                .then()
                .statusCode(200)
                .body(is(PROCESSED_PREFIX + input));
    }

}
