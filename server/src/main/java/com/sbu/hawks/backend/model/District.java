package com.sbu.hawks.backend.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Map;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "districts")
public class District {
    @Id
    private String id;
    private int districtNumber;
    private StateCode stateCode;
    private int populationTotal;
    private float geographicTotal;
    @DBRef
    private Map<Demographic, Integer> demoGraphicSummary;
    private double geographicVariation;
    private double populationVariation;
    private String winner;
    private Set<String> incumbents;
    private PoliticalParty party;
    @JsonIgnore

    public District() {
    }

    public District(int districtNumber, StateCode stateCode, int populationTotal, float geographicTotal, double geographicVariation,
                    double populationVariation, String winner, PoliticalParty party) {
        this.districtNumber = districtNumber;
        this.stateCode = stateCode;
        this.geographicVariation = geographicVariation;
        this.populationVariation = populationVariation;
        this.populationTotal = populationTotal;
        this.geographicTotal = geographicTotal;
        this.winner = winner;
        this.incumbents = null;
        this.party = party;
        this.id = districtNumber + "-" + stateCode.getStateCode();
    }

    public int getDistrictNumber() {
        return districtNumber;
    }

    public void setDistrictNumber(int districtNumber) {
        this.districtNumber = districtNumber;
    }

    public StateCode getStateCode() {
        return stateCode;
    }
    
    public int getPopulationTotal() {
        return this.populationTotal;
    }

    public float getGeographicTotal() {
        return this.geographicTotal;
    }

    public void setStateCode(StateCode stateCode) {
        this.stateCode = stateCode;
    }

    public double getGeographicVariation() {
        return geographicVariation;
    }

    public void setGeographicVariation(double geographicVariation) {
        this.geographicVariation = geographicVariation;
    }

    public double getPopulationVariation() {
        return populationVariation;
    }

    public void setPopulationVariation(double populationVariation) {
        this.populationVariation = populationVariation;
    }

    public String getWinner() {
        return this.winner;
    }

    public Set<String> getIncumbents() {
        return this.incumbents;
    }

    public PoliticalParty getParty() {
        return this.party;
    }
}