# 🚀 Cẩm Nang 100+ API Miễn Phí (Không Cần Key) Cho Mọi Lĩnh Vực

Danh sách hơn **100 API miễn phí** với lệnh `curl -X GET`, giúp bạn dễ dàng thử nghiệm trong các lĩnh vực như **động vật, tiền ảo, thời tiết, lịch sử, game, âm nhạc**, và nhiều hơn nữa! Tài liệu này được thiết kế để bạn có thể **copy-paste** và chạy ngay.

---

## 📖 Hướng Dẫn Nhanh

### Cách Sử Dụng
- Mỗi lệnh gọi API sử dụng chuẩn `curl -X GET` với headers JSON:
  ```bash
  curl -X GET '<URL>' \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json'
  ```
- **Lưu ý**: 
  - Copy lệnh vào file `.sh` để chạy trên terminal (Linux/Mac) hoặc Command Prompt/PowerShell (Windows).
  - Cài đặt `curl` nếu chưa có: [Hướng dẫn cài curl](https://curl.se/docs/install.html).
  - Một số API có thể yêu cầu tham số cụ thể (ví dụ: `latitude`, `longitude` cho thời tiết).

### Công Cụ Hỗ Trợ
- **Postman**: Thay vì chỉ dùng `curl`, bạn có thể import lệnh vào Postman để test giao diện trực quan.
- **jq**: Dùng `| jq .` sau lệnh `curl` để format JSON đẹp hơn (cài `jq` tại [stedolan.github.io/jq](https://stedolan.github.io/jq)).

---

## 🌟 14 API Nổi Bật (Đã Test)

Dưới đây là 14 API tiêu biểu, đại diện cho nhiều lĩnh vực, kèm mô tả ngắn và ví dụ output:

1. **JSON Placeholder** (Dữ liệu giả để test)
   ```bash
   curl -X GET 'https://jsonplaceholder.typicode.com/posts' \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json'
   ```
   - **Mô tả**: Trả về danh sách bài post giả, lý tưởng để test REST API.
   - **Output mẫu**: `[{ "userId": 1, "id": 1, "title": "...", "body": "..." }, ...]`

2. **Public APIs** (Danh sách API công cộng)
   ```bash
   curl -X GET 'https://api.publicapis.org/entries' \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json'
   ```
   - **Mô tả**: Trả về danh sách các API miễn phí, hữu ích để khám phá thêm.
   - **Output mẫu**: `{"count": 1400, "entries": [{ "API": "...", "Description": "...", ... }, ...]}`

3. **Cat Fact** (Sự thật về mèo)
   ```bash
   curl -X GET 'https://catfact.ninja/fact' \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json'
   ```
   - **Mô tả**: Trả về một sự thật ngẫu nhiên về mèo.
   - **Output mẫu**: `{"fact": "Cats have five toes on their front paws...", "length": 50}`

4. **Dog CEO** (Hình ảnh chó ngẫu nhiên)
   ```bash
   curl -X GET 'https://dog.ceo/api/breeds/image/random' \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json'
   ```
   - **Mô tả**: Trả về URL hình ảnh chó ngẫu nhiên.
   - **Output mẫu**: `{"message": "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg", "status": "success"}`

5. **Random User** (Dữ liệu người dùng giả)
   ```bash
   curl -X GET 'https://randomuser.me/api/' \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json'
   ```
   - **Mô tả**: Tạo thông tin người dùng giả (tên, email, địa chỉ…).
   - **Output mẫu**: `{"results": [{"name": {"first": "John", "last": "Doe"}, ...}]}`

6. **Quotable** (Trích dẫn ngẫu nhiên)
   ```bash
   curl -X GET 'https://api.quotable.io/random' \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json'
   ```
   - **Mô tả**: Trả về câu trích dẫn ngẫu nhiên.
   - **Output mẫu**: `{"content": "Be the change you wish to see...", "author": "Mahatma Gandhi"}`

7. **Rest Countries** (Thông tin quốc gia)
   ```bash
   curl -X GET 'https://restcountries.com/v3.1/all' \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json'
   ```
   - **Mô tả**: Thông tin chi tiết về tất cả quốc gia (tên, thủ đô, dân số…).
   - **Output mẫu**: `[{"name": {"common": "Vietnam", ...}, "capital": ["Hanoi"], ...}, ...]`

8. **DummyJSON** (Sản phẩm giả)
   ```bash
   curl -X GET 'https://dummyjson.com/products' \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json'
   ```
   - **Mô tả**: Trả về danh sách sản phẩm giả để test e-commerce.
   - **Output mẫu**: `{"products": [{"id": 1, "title": "iPhone 9", "price": 549, ...}, ...]}`

9. **Bored API** (Gợi ý hoạt động)
   ```bash
   curl -X GET 'https://www.boredapi.com/api/activity' \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json'
   ```
   - **Mô tả**: Gợi ý hoạt động ngẫu nhiên khi bạn chán.
   - **Output mẫu**: `{"activity": "Learn a new recipe", "type": "cooking", ...}`

10. **Joke API** (Câu đùa ngẫu nhiên)
    ```bash
    curl -X GET 'https://v2.jokeapi.dev/joke/Any' \
      -H 'Accept: application/json' \
      -H 'Content-Type: application/json'
    ```
    - **Mô tả**: Trả về một câu đùa ngẫu nhiên (có thể chọn loại như “Programming”).
    - **Output mẫu**: `{"type": "single", "joke": "Why did the scarecrow become a programmer? Because he was outstanding in his field!"}`

11. **Open-Meteo** (Dự báo thời tiết)
    ```bash
    curl -X GET 'https://api.open-meteo.com/v1/forecast?latitude=10.76&longitude=106.66&current_weather=true' \
      -H 'Accept: application/json' \
      -H 'Content-Type: application/json'
    ```
    - **Mô tả**: Dự báo thời tiết tại tọa độ (ở đây là TP.HCM).
    - **Output mẫu**: `{"current_weather": {"temperature": 28.5, "windspeed": 10.2, ...}}`

12. **CoinGecko** (Giá tiền ảo)
    ```bash
    curl -X GET 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd' \
      -H 'Accept: application/json' \
      -H 'Content-Type: application/json'
    ```
    - **Mô tả**: Giá Bitcoin và Ethereum theo USD.
    - **Output mẫu**: `{"bitcoin": {"usd": 65000}, "ethereum": {"usd": 3200}}`

13. **SpaceX** (Thông tin phóng tàu mới nhất)
    ```bash
    curl -X GET 'https://api.spacexdata.com/v4/launches/latest' \
      -H 'Accept: application/json' \
      -H 'Content-Type: application/json'
    ```
    - **Mô tả**: Thông tin về vụ phóng tàu vũ trụ mới nhất của SpaceX.
    - **Output mẫu**: `{"name": "Starlink-10", "date_utc": "2025-06-20T...", ...}`

14. **History API** (Sự kiện lịch sử)
    ```bash
    curl -X GET 'https://history.muffinlabs.com/date' \
      -H 'Accept: application/json' \
      -H 'Content-Type: application/json'
    ```
    - **Mô tả**: Sự kiện lịch sử trong ngày hôm nay.
    - **Output mẫu**: `{"date": "June 30", "data": {"Events": [{"year": 1969, "text": "..."}, ...]}}`

---

## 🔗 Kho 100+ API Miễn Phí

Danh sách API phong phú, chia theo **20+ lĩnh vực** như Animals, Crypto, Dev Tools, Food, Games, Music…:

1. **Public APIs (GitHub)**: Kho API công cộng, cập nhật liên tục.
   - Link: [apipheny.io](https://apipheny.io/free-api/?utm_source=chatgpt.com)
   - Gợi ý: Lọc theo danh mục (Category) để tìm API phù hợp.

2. **Mixed Analytics**: Danh sách hơn 100 API không cần auth, dễ sử dụng.
   - Link: [mixedanalytics.com](https://mixedanalytics.com/blog/list-actually-free-open-no-auth-needed-apis/?utm_source=chatgpt.com)
   - Gợi ý: Sử dụng bảng Excel của Mixed Analytics để tra cứu nhanh.

3. **Thêm nguồn bổ sung**:
   - [Postman Public API Collection](https://www.postman.com/api-evangelist/workspace/public-apis): Bộ sưu tập API miễn phí trên Postman.
   - [RapidAPI Free APIs](https://rapidapi.com/collection/free-apis): Một số API miễn phí (lọc “No Auth”).

---

## 🛠️ Bước Tiếp Theo

1. **Khám phá API**:
   - Truy cập các nguồn trên, chọn API theo lĩnh vực bạn quan tâm.
   - Đọc tài liệu của API để biết thêm tham số (parameters) hoặc endpoint.

2. **Tạo lệnh `curl`**:
   - Sử dụng template `curl` ở trên, thay `<URL>` bằng endpoint của API.
   - Thêm tham số nếu cần (ví dụ: `?key=value`).

3. **Test và Tích hợp**:
   - Chạy lệnh `curl` trên terminal hoặc import vào Postman.
   - Lưu kết quả vào file JSON: `curl ... > output.json`.
   - Tích hợp vào dự án (Node.js, Python, etc.) với các thư viện như `axios` hoặc `requests`.

4. **Mẹo nâng cao**:
   - Dùng `jq` để xử lý JSON: `curl ... | jq .`.
   - Tự động hóa với script Bash hoặc Python để gọi nhiều API.
   - Kiểm tra rate limit của API để tránh bị chặn.

---

## ⚠️ Lưu Ý
- Một số API có thể thay đổi endpoint hoặc yêu cầu key trong tương lai. Kiểm tra tài liệu chính thức trước khi dùng.
- Nếu gặp lỗi (429, 503…), thử lại sau vài phút hoặc kiểm tra rate limit.
- API thời tiết như Open-Meteo yêu cầu tọa độ chính xác (latitude/longitude).
