package com.sbu.hawks.backend.repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.sbu.hawks.backend.model.DistrictPlan;
import com.sbu.hawks.backend.model.PlanType;
import com.sbu.hawks.backend.model.StateCode;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DistrictPlanRepository extends MongoRepository<DistrictPlan, StateCode> {

    DistrictPlan getDistrictPlanByStateCodeAndPlanType(StateCode stateCode, PlanType planType);
}