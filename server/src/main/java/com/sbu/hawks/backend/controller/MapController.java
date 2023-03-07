package com.sbu.hawks.backend.controller;


import com.sbu.hawks.backend.service.MapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/map")
public class MapController {

    private MapService mapService;

    @Autowired
    public MapController(MapService service) {
        this.mapService = service;
    }

    @GetMapping("/FL")
    @ResponseBody
    String getFlorida() {
        return "testing from 3000";
    }
}
