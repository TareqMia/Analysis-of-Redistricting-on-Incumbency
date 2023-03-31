package com.sbu.hawks.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.awt.Polygon;
import java.util.List;

public class District {
    private int districtNumber;
    private StateCode stateCode;
    private Candidate candidate;
    private double geographicVariation;
    private double populationVariation;
    private List<Precinct> precincts;

    public District(int districtNumber, StateCode stateCode, Candidate candidate, double geographicVariation,
                    double populationVariation, List<Precinct> precincts) {
        this.districtNumber = districtNumber;
        this.stateCode = stateCode;
        this.candidate = candidate;
        this.geographicVariation = geographicVariation;
        this.populationVariation = populationVariation;
        this.precincts = precincts;
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

    public void setStateCode(StateCode stateCode) {
        this.stateCode = stateCode;
    }

    public Candidate getCandidate() {
        return candidate;
    }

    public void setCandidate(Candidate candidate) {
        this.candidate = candidate;
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

    public List<Precinct> getPrecincts() {
        return precincts;
    }

    public void setPrecincts(List<Precinct> precincts) {
        this.precincts = precincts;
    }
}

