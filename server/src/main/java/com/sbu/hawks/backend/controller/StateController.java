package com.sbu.hawks.backend.controller;


import com.sbu.hawks.backend.model.DistrictPlan;
import com.sbu.hawks.backend.model.PlanType;
import com.sbu.hawks.backend.model.State;
import com.sbu.hawks.backend.model.StateCode;
import com.sbu.hawks.backend.service.StateService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class StateController {


    private final StateService stateService;


    public StateController(StateService stateService) {
        this.stateService = stateService;
    }

    @GetMapping("/map/{stateCode}")
    public State getStateOutline(@PathVariable StateCode stateCode) {
        State state = new State();
        state.setStateCode(stateCode);
        DistrictPlan districtPlan = stateService.getDistrictPlanByStateCodeAndPlanType(stateCode, PlanType.NONE);
        state.setDistrictPlan(districtPlan);

        return state;
    }

    @GetMapping("/map")
    public List<DistrictPlan> getAllPlans() {
        return stateService.getDistrictPlans();
    }
}
