# Fission Serverless with Node-JS

## Port Forward
```
kubectl --namespace fission port-forward $(kubectl --namespace fission get pod -l svc=router -o name) 31314:8888
```

fission-nodejs-serverless % fission httptrigger update --method PUT --url "/convert/{from}/{to}" --function convert --name route-convert
fission-nodejs-serverless % fission route create --spec --method POST --url /convert/{from}/{to} --function convert --namespace default --name convert
