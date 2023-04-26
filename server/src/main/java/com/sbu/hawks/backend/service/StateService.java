package com.sbu.hawks.backend.service;

import com.sbu.hawks.backend.model.DistrictPlan;
import com.sbu.hawks.backend.model.PlanType;
import com.sbu.hawks.backend.model.StateCode;
import com.sbu.hawks.backend.repository.DistrictPlanRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StateService {

    private final DistrictPlanRepository districtPlanRepository;

    public StateService(DistrictPlanRepository districtPlanRepository) {
        this.districtPlanRepository = districtPlanRepository;
    }

    public DistrictPlan getDistrictPlanByStateCodeAndPlanType(StateCode stateCode, PlanType planType) {
        System.out.println(stateCode);
        System.out.println(planType);

        return districtPlanRepository.getDistrictPlanByStateCodeAndPlanType(stateCode, planType);
    }

    public List<DistrictPlan> getDistrictPlans() {
        return districtPlanRepository.findAll();
    }
}
