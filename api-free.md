Dưới đây là tài liệu dạng **`curl -X GET`** cho hơn **100 API miễn phí** giúp bạn test đủ mọi lĩnh vực (mèo, chó, thời tiết, tiền ảo, lịch sử…):

---

## 📚 Hướng dẫn nhanh

* Mỗi đoạn lệnh gọi theo chuẩn:

  ```bash
  curl -X GET '<URL>' \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json'
  ```
* Bạn có thể copy hết vào file `.sh` và chạy.

---

## 🗂️ 14 ví dụ nổi bật

```bash
curl -X GET 'https://jsonplaceholder.typicode.com/posts' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json'

curl -X GET 'https://api.publicapis.org/entries' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json'

curl -X GET 'https://catfact.ninja/fact' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json'

curl -X GET 'https://dog.ceo/api/breeds/image/random' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json'

curl -X GET 'https://randomuser.me/api/' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json'

curl -X GET 'https://api.quotable.io/random' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json'

curl -X GET 'https://restcountries.com/v3.1/all' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json'

curl -X GET 'https://dummyjson.com/products' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json'

curl -X GET 'https://www.boredapi.com/api/activity' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json'

curl -X GET 'https://v2.jokeapi.dev/joke/Any' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json'

curl -X GET 'https://api.open-meteo.com/v1/forecast?latitude=10.76&longitude=106.66&current_weather=true' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json'

curl -X GET 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json'

curl -X GET 'https://api.spacexdata.com/v4/launches/latest' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json'

curl -X GET 'https://history.muffinlabs.com/date' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json'
```

---

## 🔗 Danh sách 100+ API miễn phí

Mình đã tổng hợp danh sách phong phú hơn **100 API miễn phí** (không cần API key), thuộc 20+ lĩnh vực như Animals, Crypto, Dev Tools, Food, Games, Music… Dễ dàng khám phá qua:

👉 **Public APIs (GitHub)** – kho API lớn, cập nhật thường xuyên ([apipheny.io][1], [mixedanalytics.com][2])
👉 **Mixed Analytics** – danh sách hơn 100 API không cần auth ([mixedanalytics.com][2])

---

## 🧰 Bước tiếp theo cho bạn

1. Duyệt qua các nguồn trên, chọn API phù hợp từng lĩnh vực.
2. Chuyển URL vào `curl` template như trên.
3. Test ngay!!!!!

---

[1]: https://apipheny.io/free-api/?utm_source=chatgpt.com "Free API - 90+ Public APIs For Testing [No Key] - Apipheny"
[2]: https://mixedanalytics.com/blog/list-actually-free-open-no-auth-needed-apis/?utm_source=chatgpt.com "Big List of Free and Open Public APIs (No Auth Needed)"
