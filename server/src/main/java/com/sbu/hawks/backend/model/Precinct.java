package com.sbu.hawks.backend.model;

import java.util.List;
import java.util.Map;

public class Precinct {
    private int precinctNumber;
    private String precinctName;
    private int populationCount;
    private long geoCode;
    private int votingAgePopulation;
    private List<Map<Demographic,Integer>> demographic;

    public Precinct(int precinctNumber, String precinctName, int populationCount, long geoCode,
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

    public long getGeoCode() {
        return geoCode;
    }

    public void setGeoCode(long geoCode) {
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