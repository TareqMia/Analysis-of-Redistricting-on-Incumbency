package com.sbu.hawks.backend.model;

import java.util.Set;

import org.bson.json.JsonObject;
import org.springframework.data.annotation.Id;

public class State {
    @Id
    private StateCode stateCode;
    private final JsonObject currentDistrictPlan;
    private final Set<DistrictPlan> districtPlans;
    private final Ensemble ensemble;

    public State(StateCode stateCode, JsonObject districtPlan) {
        this.stateCode = stateCode;
        this.currentDistrictPlan = districtPlan;
        this.districtPlans = null;
        this.ensemble = null;
    }

    public StateCode getStateCode() {
        return this.stateCode;
    }

    public JsonObject getCurrentDistrictPLan() {
        return this.currentDistrictPlan;
    }

    public Set<DistrictPlan> getDistrictPlans() {
        return this.districtPlans;
    }

    public Ensemble getEnsemble() {
        return this.ensemble;
    }

}
