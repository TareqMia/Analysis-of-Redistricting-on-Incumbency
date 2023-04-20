package com.sbu.hawks.backend.repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.sbu.hawks.backend.model.DistrictPlan;
import com.sbu.hawks.backend.model.PlanType;
import com.sbu.hawks.backend.model.State;
import com.sbu.hawks.backend.model.StateCode;

public interface DistrictPlanRepository extends MongoRepository<DistrictPlan, StateCode> {
    DistrictPlanRepository getDistrictPlanByStateandPlanType(State state, PlanType planType);
}