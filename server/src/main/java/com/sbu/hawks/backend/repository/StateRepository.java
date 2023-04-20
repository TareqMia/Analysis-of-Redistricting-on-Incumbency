package com.sbu.hawks.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.sbu.hawks.backend.model.State;
import com.sbu.hawks.backend.model.StateCode;

public interface StateRepository extends MongoRepository<State, StateCode> {
    State getStateByStateCode(StateCode stateCode);
}