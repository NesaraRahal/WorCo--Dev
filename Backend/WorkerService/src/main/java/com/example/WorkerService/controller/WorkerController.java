package com.example.WorkerService.controller;

import com.example.WorkerService.data.Worker;
import com.example.WorkerService.service.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WorkerController {

    @Autowired
    private WorkerService workerService ;

    @PostMapping(path = "/workers")
    public ResponseEntity<Worker> createWorker(@RequestBody Worker worker){
        Worker savedWorker = workerService.saveWorker(worker);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedWorker);
    }

}
