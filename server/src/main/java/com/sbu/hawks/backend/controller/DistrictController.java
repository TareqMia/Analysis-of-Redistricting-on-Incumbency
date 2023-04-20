package com.sbu.hawks.backend.controller;

import com.sbu.hawks.backend.model.District;
import com.sbu.hawks.backend.model.StateCode;
import com.sbu.hawks.backend.service.DistrictService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/districts")
public class DistrictController {

    private final DistrictService districtService;


    public DistrictController(DistrictService districtService) {
        this.districtService = districtService;
    }

    @GetMapping("/{stateCode}/{districtNumber}")
    public District getDistrictByStateCodeAndDistrictNumber(@PathVariable StateCode stateCode,
                                                            @PathVariable int districtNumber) {
        return districtService.getDistrictByStateCodeAndDistrictNumber(stateCode, districtNumber);
    }

    @GetMapping("/incumbents/{stateCode}")
    public List<District> getIncumbentsByStateCode(@PathVariable StateCode stateCode) {
        return districtService.getIncumbentsByState(stateCode);
    }
}
