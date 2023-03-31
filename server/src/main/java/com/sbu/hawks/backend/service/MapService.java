package com.sbu.hawks.backend.service;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

@Service
public class MapService {

    public String getStateGeoJson(String stateCode) {

        String path = System.getProperty("java.class.path").split("server")[0]
                + "server/src/main/resources/static/";

        Map<String, String> stateGeoJsonMap = new HashMap<>();
        stateGeoJsonMap.put("FL", path + "fl-state_outline.json");
        stateGeoJsonMap.put("GA", path + "ga-state_outline.json");
        stateGeoJsonMap.put("PA", path + "pa-state_outline.json");

        String geoJsonFilePath = stateGeoJsonMap.get(stateCode);
        if (geoJsonFilePath == null) {
            throw new IllegalArgumentException("Invalid state code");
        }

        try {
            return Files.readString(Paths.get(geoJsonFilePath));
        } catch (IOException e) {
            return e.getMessage();
        }
    }
}
