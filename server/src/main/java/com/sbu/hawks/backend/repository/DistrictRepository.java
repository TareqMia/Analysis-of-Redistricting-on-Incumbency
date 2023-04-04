package com.sbu.hawks.backend.repository;

import com.sbu.hawks.backend.model.District;
import com.sbu.hawks.backend.model.StateCode;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DistrictRepository extends MongoRepository<District, String> {
    District getDistrictByStateCodeAndDistrictNumber(StateCode stateCode, int districtNumber);

}
