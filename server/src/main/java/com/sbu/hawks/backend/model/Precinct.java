package com.sbu.hawks.backend.model;

import java.util.List;
import java.util.Map;

public class Precinct {
    private int precinctNumber;
    private String precinctName;
    private int populationCount;
    private String geoCode;
    private int votingAgePopulation;
    private List<Map<Demographic,Integer>> demographic;

    public Precinct(int precinctNumber, String precinctName, int populationCount, String geoCode,
                    int votingAgePopulation, List<Map<Demographic, Integer>> demographic) {
        this.precinctNumber = precinctNumber;
        this.precinctName = precinctName;
        this.populationCount = populationCount;
        this.geoCode = geoCode;
        this.votingAgePopulation = votingAgePopulation;
        this.demographic = demographic;
    }

    public int getPrecinctNumber() {
        return precinctNumber;
    }

    public void setPrecinctNumber(int precinctNumber) {
        this.precinctNumber = precinctNumber;
    }

    public String getPrecinctName() {
        return precinctName;
    }

    public void setPrecinctName(String precinctName) {
        this.precinctName = precinctName;
    }

    public int getPopulationCount() {
        return populationCount;
    }

    public void setPopulationCount(int populationCount) {
        this.populationCount = populationCount;
    }

    public String getGeoCode() {
        return geoCode;
    }

    public void setGeoCode(String geoCode) {
        this.geoCode = geoCode;
    }

    public int getVotingAgePopulation() {
        return votingAgePopulation;
    }

    public void setVotingAgePopulation(int votingAgePopulation) {
        this.votingAgePopulation = votingAgePopulation;
    }

    public List<Map<Demographic, Integer>> getDemographic() {
        return demographic;
    }

    public void setDemographic(List<Map<Demographic, Integer>> demographic) {
        this.demographic = demographic;
    }
}