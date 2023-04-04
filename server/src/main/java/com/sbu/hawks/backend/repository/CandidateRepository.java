package com.sbu.hawks.backend.repository;

import com.sbu.hawks.backend.model.Candidate;
import com.sbu.hawks.backend.model.StateCode;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface CandidateRepository extends MongoRepository<Candidate, ObjectId> {
    @Query("{ 'stateCode' : ?0, 'districtNumber' : ?1, 'electionResult': 'WON' }")
    Candidate findFirstByStateCodeAndDistrictNumber(StateCode stateCode, int districtNumber);
    List<Candidate> findCandidatesByStateCode(StateCode stateCode);
    List<Candidate> findCandidatesByStateCodeAndDistrictNumber (StateCode stateCode, int districtNumber);

    List<Candidate> findCandidatesByStateCodeAndIsIncumbent(StateCode stateCode, boolean isIncumbent);
}
