# Build our docker images and tag latest + build number tagged versions
docker build -t "$DOCKER_ID"/multi-client:latest -t "$DOCKER_ID"/multi-client:"$TRAVIS_BUILD_NUMBER" ./client
docker build -t "$DOCKER_ID"/multi-server:latest -t "$DOCKER_ID"/multi-server:"$TRAVIS_BUILD_NUMBER" ./express_server
docker build -t "$DOCKER_ID"/multi-worker:latest -t "$DOCKER_ID"/multi-worker:"$TRAVIS_BUILD_NUMBER" ./worker

# Push up our changed images to Docker hub
docker push "$DOCKER_ID"/multi-client:"$TRAVIS_BUILD_NUMBER"
docker push "$DOCKER_ID"/multi-client:latest

docker push "$DOCKER_ID"/multi-server:"$TRAVIS_BUILD_NUMBER"
docker push "$DOCKER_ID"/multi-server:latest

docker push "$DOCKER_ID"/multi-worker:"$TRAVIS_BUILD_NUMBER"
docker push "$DOCKER_ID"/multi-worker:latest

kubectl apply -f k8s_config/
kubectl set image deployments/client-deployment client="$DOCKER_ID"/multi-client:"$TRAVIS_BUILD_NUMBER"
kubectl set image deployments/server-deployment server="$DOCKER_ID"/multi-server:"$TRAVIS_BUILD_NUMBER"
kubectl set image deployments/worker-deployment worker="$DOCKER_ID"/multi-worker:"$TRAVIS_BUILD_NUMBER"
