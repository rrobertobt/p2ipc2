package com.robertob.p2ipc2backend.services;

import com.robertob.p2ipc2backend.database.TestTypeRepository;
import com.robertob.p2ipc2backend.models.TestType;

import java.util.List;

public class TestTypeService {
    private final TestTypeRepository testTypeRepository;
    public TestTypeService() {
        this.testTypeRepository = new TestTypeRepository();
    }
    public List<TestType> findAll() {
        return testTypeRepository.findAll();
    }
}
