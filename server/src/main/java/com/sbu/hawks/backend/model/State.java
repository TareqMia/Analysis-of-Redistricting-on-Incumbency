package com.sbu.hawks.backend.model;

import java.util.Set;

import org.bson.json.JsonObject;
import org.springframework.data.annotation.Id;

public class State {
    @Id
    private StateCode stateCode;
    private JsonObject currentDistrictPlan;
    private Set<DistrictPlan> districtPlans;
    private Ensemble ensemble;

    public State(StateCode stateCode, JsonObject districtplan) {
        this.stateCode = stateCode;
        this.currentDistrictPlan = districtplan;
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
