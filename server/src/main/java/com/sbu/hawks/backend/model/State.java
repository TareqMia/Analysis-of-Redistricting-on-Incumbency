package com.sbu.hawks.backend.model;

import java.util.Set;

import org.bson.json.JsonObject;
import org.springframework.data.annotation.Id;

public class State {
    @Id
    private StateCode stateCode;
    private DistrictPlan districtPlan;
    private  Ensemble ensemble;

    public State() { }

    public State(StateCode stateCode, JsonObject districtPlan) {
        this.stateCode = stateCode;
        this.districtPlan = null;
        this.ensemble = null;
    }

    public void setStateCode(StateCode stateCode) {
        this.stateCode = stateCode;
    }


    public void setDistrictPlan(DistrictPlan districtPlan) {
        this.districtPlan = districtPlan;
    }

    public void setEnsemble(Ensemble ensemble) {
        this.ensemble = ensemble;
    }

    public StateCode getStateCode() {
        return this.stateCode;
    }

    public DistrictPlan getDistrictPlan() {
        return this.districtPlan;
    }

    public Ensemble getEnsemble() {
        return this.ensemble;
    }

}