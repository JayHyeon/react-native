# .env 파일은 포트번호와 DB접속 정보를 포함하고 있음
# PORT='PORT NUMBER'
# MONGO_URI='MONGODB URI'

# 실행 순서
# 1. MongoDB URI 및 포트번호를 기입한 .env파일 작성
# 2. npm install
# 3. node ./server/server.js
# 4. npm start

# 오류 발생 시
# 1. rm -rf node_modules
# 2. rm -rf package-lock.json
# 3. cd ios && pod deintegrate && pod install --repo-update && cd ..
# 4. watchman watch-del-all
# 5. npm start -- --reset-cache

# 참고
# https://oblador.github.io/react-native-vector-icons/
