package com.sbu.hawks.backend.controller;

import com.sbu.hawks.backend.service.MapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/map")
public class MapController {

    private final MapService mapService;

    @Autowired
    public MapController(MapService service) {
        this.mapService = service;
    }

//    @GetMapping("/{state}")
//    @ResponseBody
//    State getStateGeoJson(@PathVariable String state) {
//        return new State(state, null, mapService.getStateGeoJson(state));
//    }
}
