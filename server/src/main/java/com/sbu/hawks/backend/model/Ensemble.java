package com.sbu.hawks.backend.model;

import java.util.Map;
import java.util.Set;

import org.springframework.data.annotation.Id;

public class Ensemble {
    @Id
    private StateCode stateCode;
    private int numDistrictPlans;
    private int numIncumbents;
    private int numPredictedWinners;
    private double avgPopulationVariation;
    private double avgGeographicVariation;
    private Set<DistrictPlan> districtPlans;
    private Map<String, Integer> populationGraph;
    private Map<String, Integer> geographicGraph;
    private Map<String, Integer> demographicGraph;

    public Ensemble(int numDistrictPlans, int numIncumbents, int numPredictedWinners, double avgPopulationVariation, 
        double avgGeographicVariation) {
            this.numDistrictPlans = numDistrictPlans;
            this.numIncumbents = numIncumbents;
            this.numPredictedWinners = numPredictedWinners;
            this.avgPopulationVariation = avgPopulationVariation;
            this.avgGeographicVariation = avgGeographicVariation;
            this.districtPlans = null;
    }

    public int getNumDistrictPlans() {
        return this.numDistrictPlans;
    }

    public int getNumIncumbents() {
        return this.numIncumbents;
    }
    
    public int getNumPredictedWinners() {
        return this.numPredictedWinners;
    }

    public double getAvgPopulationVariation() {
        return this.avgPopulationVariation;
    }

    public double getAvgGeographicVariation() {
        return this.avgGeographicVariation;
    }

    public Set<DistrictPlan> getDistrictPlans() {
        return this.districtPlans;
    }

    public void setPopulationGraph(Map<String, Integer> graph) {
        this.populationGraph = graph;
    }

    public void setGeographicGraph(Map<String, Integer> graph) {
        this.geographicGraph = graph;
    }

    public void setDemographicGraph(Map<String, Integer> graph) {
        this.demographicGraph = graph;
    }
}