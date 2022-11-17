package de.renfis;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

import org.junit.jupiter.api.Test;

import io.quarkus.test.junit.QuarkusTest;

@QuarkusTest
public class PictProcessorResourceTest {

    @Test
    public void testHelloEndpoint() {
        given()
                .when().body("pict input").post("/pict")
                .then()
                .statusCode(200)
                .body(is("Processed: pict input"));
    }

}
