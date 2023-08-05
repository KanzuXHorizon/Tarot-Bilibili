
function Create_And_Respone() {

    // Function to generate a random formation
    function generateFormation() {
        const tarotData = JSON_Tarot();
        const formations = Object.keys(tarotData.formations);
        const randomFormation = formations[Math.floor(Math.random() * formations.length)];
        return tarotData.formations[randomFormation];
    }

    // Function to divine the cards
    function divineCards(formation) {
        const tarotData = JSON_Tarot();
        const cards = tarotData.cards;
        const divinedCards = [];

        const formationRepresentation = formation.representations[Math.floor(Math.random() * formation.representations.length)];
            for (let i = 0; i < formation.cards_num; i++) {
                const randomCardIndex = Math.floor(Math.random() * Object.keys(cards).length);
                const randomCard = cards[randomCardIndex];
                const random_meaning = ['up','down'][Math.floor(Math.random() * 2)];

                if ((divinedCards[divinedCards.length - 1]) && (divinedCards[divinedCards.length - 1]).Name ==  randomCard.name_en + " / " + randomCard.name_cn + " (" + (random_meaning == "up" ? "Thẳng": "Ngược") + ")") {
                    i--;
                    continue;
                }

                divinedCards.push({
                    Name: randomCard.name_en + " / " + randomCard.name_cn + " (" + (random_meaning == "up" ? "Thẳng": "Ngược") + ")",
                    Representation: formationRepresentation[i],//đại diện
                    Meaning: randomCard.meaning[random_meaning], // Replace with randomCard.meaning.up or .down for random meanings
                    Type: randomCard.type,
                    Image: randomCard.pic
                });
            }
        return divinedCards;
    }

    function format_type(Type) {
        switch (Type) {
            case "MajorArcana" : return "Bộ Ẩn Chính";
            default: return Type;
        }
    }

    function generator_msg(Cards) {
        const arr = [];
        for (let i of Cards) {
            arr.push({
                Name: i.Name,
                Representation: "- Đại Diện: " + i.Representation,
                Meaning: "- Ý Nghĩa: " + i.Meaning,
                Type: "- Thuộc Loại: " + format_type(i.Type)
            });
        }
    }

    const Card = divineCards(generateFormation());
    return {
        Card: Card,
        Msg: generator_msg(Card)
    }; 
}
window.onload = Delete_And_Create_Card()

function Delete_And_Create_Card() {
    const container = document.getElementsByClassName('container')[0]
    var child = (document.getElementsByClassName('container')[0]);
        while(child.firstElementChild) {
            child.removeChild(child.firstElementChild);
        }
    const new_message = Create_And_Respone();
    const popup = document.querySelector('.popup');
    const popupBack = document.querySelector('.popup-back');
    popupBack.addEventListener('click', () => {
        popup.classList.remove('active');
    });

    var Xy = 1;
    for (let i of new_message.Card) {

        let cardDiv = document.createElement('div');

        let cardImg = document.createElement('img');

            cardDiv.className = 'card';
            cardImg.className = 'RvCard';
            if (Xy == 1) {
                cardImg.src = './Image/BilibiliTarot/' + 'Extra' + "/" + 'tarot.png';
                Xy++;
            }
            else if (Xy == 2) {
                cardImg.src = './Image/BilibiliTarot/' + 'Extra' + "/" + '背景.png';
                Xy = 1;
            }
            
            cardImg.onclick = function() {
                if (!cardImg.classList.contains('flipped') && !cardImg.classList.contains('slide')) {
                    if ((i.Name).includes('Ngược')) {
                        cardImg.classList.add('slide');
                    }
                    else {
                        cardImg.classList.add('flipped');
                    }
                    cardImg.src = './Image/BilibiliTarot/' + i.Type + "/" + i.Image + ".png";
                }
                else {
                    const title = document.getElementById('popupName');
                    title.innerHTML = `<b> ${i.Name} </b>`
                    const Description = document.getElementById('descriptionpop');
                    Description.innerHTML = "<b> [|] => Ý Nghĩa <= [|]</b> <br> <i>" + i.Meaning + "</i>";
                    const Image = document.getElementById('imgne');
                    Image.src = './Image/BilibiliTarot/' + i.Type + "/" + i.Image + ".png";
                    const keyword = document.getElementById('keyword');
                    keyword.innerHTML = '<b> ||| => Từ Khoá <= ||| </b> <br> <i>' + i.Representation + "</i>";
                    popup.classList.add('active');
                }
            }
            cardImg.alt = i.Name;

        cardDiv.appendChild(cardImg);
        
        container.appendChild(cardDiv);
    }
}


function JSON_Tarot() {
    return {
        "formations": {
            "Tam Giác Thánh": {
            "cards_num": 3,
            "is_cut": false,
            "representations": [
                [
                "tình huống",
                "hành động",
                "kết quả"
                ],
                [
                "Trạng thái",
                "Mong muốn",
                "Hành động"
                ]
            ]
            },
            "Dòng Thời Gian": {
            "cards_num": 3,
            "is_cut": true,
            "representations": [
                [
                "quá khứ",
                "hiện tại",
                "tương lai"
                ]
            ]
            },
            "Bốn Phần Tử": {
            "cards_num": 4,
            "is_cut": false,
            "representations": [
                [
                "Lửa, tượng trưng cho hành động, lời khuyên về hành động",
                "Khí, một biểu tượng của lời nói, các biện pháp đối phó bằng lời nói",
                "Nước, tượng trưng cho tình cảm, thái độ tình cảm",
                "Thổ, tượng trưng cho vật chất, chuẩn bị vật chất"
                ]
            ]
            },
            "Ngũ Bài Trận": {
            "cards_num": 5,
            "is_cut": true,
            "representations": [
                [
                "vấn đề hiện tại hoặc chính",
                "Ảnh hưởng trong quá khứ",
                "tương lai",
                "Lý do chính",
                "Hậu quả có thể xảy ra của hành động"
                ]
            ]
            },
            "Chiếc Thập Giá Của Người Tự Do": {
            "cards_num": 5,
            "is_cut": false,
            "representations": [
                [
                "Suy nghĩ của bên kia",
                "suy nghĩ của bạn",
                "Có vấn đề trong việc hòa hợp",
                "Môi trường hiện tại của cả hai",
                "Kết quả phát triển mối quan hệ"
                ]
            ]
            },
            "Trận Bài Hóa Mã Đậu": {
            "cards_num": 6,
            "is_cut": true,
            "representations": [
                [
                "hiện trạng",
                "Những tình huống có thể thấy trước",
                "tình huống không thể đoán trước",
                "sắp tới",
                "kết quả",
                "Suy nghĩ chủ quan của Querent"
                ]
            ]
            },
            "Hexagram Tarot Spread.": {
            "cards_num": 6,
            "is_cut": true,
            "representations": [
                [
                "quá khứ",
                "hiện tại",
                "tương lai",
                "biện pháp đối phó",
                "môi trường",
                "thái độ",
                "kết quả dự đoán"
                ]
            ]
            },
            "Bình An Phiến Bài Trận": {
            "cards_num": 4,
            "is_cut": false,
            "representations": [
                [
                "Hiện trạng mối quan hệ giữa các cá nhân",
                "Nguyên nhân quen biết với đối phương",
                "Sự phát triển mối quan hệ giữa hai bên",
                "Kết luận về mối quan hệ giữa hai bên"
                ]
            ]
            },
            "Mảng sao Shadiruo": {
            "cards_num": 6,
            "is_cut": true,
            "representations": [
                [
                "Cảm xúc của người hỏi",
                "Câu hỏi của người hỏi",
                "Các yếu tố ảnh hưởng đến vấn đề",
                "Quá khứ khiến người hỏi vướng mắc với câu hỏi",
                "Cần chú ý/xem xét",
                "Kết quả có thể xảy ra"
                ]
            ]
            }
        },
        "cards": {
            "0": {
            "name_cn": "愚者",
            "name_en": "The Fool",
            "type": "MajorArcana",
            "meaning": {
                "up": "Khởi đầu mới, phiêu lưu, tự tin, lạc quan, true thời điểm",
                "down": "Không true lúc, liều lĩnh, cả tin, chấp nhận rủi ro"
            },
            "pic": "0-愚者"
            },
            "1": {
            "name_cn": "魔术师",
            "name_en": "The Magician",
            "type": "MajorArcana",
            "meaning": {
                "up": "Sáng tạo, quyết đoán, đam mê, tiềm năng phát triển",
                "down": "Thiếu sáng tạo, thiếu quyết đoán, tài năng tầm thường, kế hoạch kém"
            },
            "pic": "01-魔术师"
            },
            "2": {
            "name_cn": "女祭司",
            "name_en": "The High Priestess",
            "type": "MajorArcana",
            "meaning": {
                "up": "Tiềm thức, Cái nhìn sâu sắc, Trí tuệ, Tinh thần nghiên cứu",
                "down": "Thu mình, hướng nội, thần kinh, không lý trí"
            },
            "pic": "02-女祭司"
            },
            "3": {
            "name_cn": "女皇",
            "name_en": "The Empress",
            "type": "MajorArcana",
            "meaning": {
                "up": "Làm mẹ, nữ tính, sức sống, sự chấp nhận",
                "down": "Vấn đề sinh sản, sự bất an, nhạy cảm, bị ám ảnh bởi những chi tiết vụn vặt"
            },
            "pic": "03-女皇"
            },
            "4": {
            "name_cn": "皇帝",
            "name_en": "The Emperor",
            "type": "MajorArcana",
            "meaning": {
                "up": "kiểm soát, ý chí, lãnh đạo, quyền lực, ảnh hưởng",
                "down": "hỗn loạn, bướng bỉnh, chuyên chế, quản lý kém, không thực tế"
            },
            "pic": "04-皇帝"
            },
            "5": {
            "name_cn": "教皇",
            "name_en": "The Hierophant",
            "type": "MajorArcana",
            "meaning": {
                "up": "đáng tin cậy, ngoan ngoãn, tuân thủ quy tắc",
                "down": "mất lòng tin, tự mãn, thẩm quyền đặt câu hỏi, thuyết phục ác ý"
            },
            "pic": "05-教皇"
            },
            "6": {
            "name_cn": "恋人",
            "name_en": "The Lovers",
            "type": "MajorArcana",
            "meaning": {
                "up": "Tình yêu, kết nối thể xác, mối quan hệ mới, khoảng thời gian vui vẻ, hỗ trợ lẫn nhau",
                "down": "Tình dục quá mức, ngoại tình, thất hứa, lựa chọn tình cảm"
            },
            "pic": "06-恋人"
            },
            "7": {
            "name_cn": "战车",
            "name_en": "The Chariot",
            "type": "MajorArcana",
            "meaning": {
                "up": "Hiệu quả cao, nắm bắt thời cơ, bền bỉ, quyết tâm, mạnh mẽ, vượt qua trở ngại",
                "down": "mất kiểm soát, thất vọng, dùng đến bạo lực, bốc đồng"
            },
            "pic": "07-战车"
            },
            "8": {
            "name_cn": "力量",
            "name_en": "Strength",
            "type": "MajorArcana",
            "meaning": {
                "up": "Dũng cảm, quyết tâm, vượt chướng ngại vật, can đảm",
                "down": "Sợ hãi, năng lượng thấp, thiếu tự tin, hèn nhát"
            },
            "pic": "08-力量"
            },
            "9": {
            "name_cn": "隐士",
            "name_en": "The Hermit",
            "type": "MajorArcana",
            "meaning": {
                "up": "Nội tâm, tự kiểm điểm, khám phá nội tâm, bình an",
                "down": "đơn độc, bị cô lập, quá thận trọng, lảng tránh"
            },
            "pic": "09-隐士"
            },
            "10": {
            "name_cn": "命运之轮",
            "name_en": "The Wheel of Fortune",
            "type": "MajorArcana",
            "meaning": {
                "up": "Nắm lấy cơ hội, cơ hội mới, may mắn đến, thay đổi đến",
                "down": "xui xẻo, không true lúc, kế hoạch thất bại"
            },
            "pic": "10-命运之轮"
            },
            "11": {
            "name_cn": "正义",
            "name_en": "Justice",
            "type": "MajorArcana",
            "meaning": {
                "up": "công bằng, chính trực, trung thực, công bằng và nhất quán",
                "down": "mất cân bằng, định kiến, không trung thực, trùng lặp"
            },
            "pic": "11-正义"
            },
            "12": {
            "name_cn": "倒吊人",
            "name_en": "The Hanged Man",
            "type": "MajorArcana",
            "meaning": {
                "up": "tiến thoái lưỡng nan, chấp nhận thử thách, ngụy trang ban phước lành, từ bỏ hành động để theo đuổi sự hiển linh",
                "down": "Không sợ hy sinh, ích kỷ, phản kháng nội tâm, thiếu tầm nhìn"
            },
            "pic": "12-倒吊人"
            },
            "13": {
            "name_cn": "死神",
            "name_en": "Death",
            "type": "MajorArcana",
            "meaning": {
                "up": "Mất mát, bị bỏ rơi, chia tay, cái chết, sự xuất hiện của những điều mới",
                "down": "Làm sống lại, thay đổi suy nghĩ, thoát khỏi thực tại"
            },
            "pic": "13-死神"
            },
            "14": {
            "name_cn": "节制",
            "name_en": "Temperance",
            "type": "MajorArcana",
            "meaning": {
                "up": "Cân bằng, Hài hòa, Chữa bệnh, Tiết độ",
                "down": "Mất cân bằng, lạc điệu, ham mê khoái lạc, quá nuông chiều"
            },
            "pic": "14-节制"
            },
            "15": {
            "name_cn": "恶魔",
            "name_en": "The Devil",
            "type": "MajorArcana",
            "meaning": {
                "up": "Ảnh hưởng tiêu cực, ham muốn tham lam, chủ meaning vật chất, cố chấp",
                "down": "Thoát khỏi ràng buộc, từ chối cám dỗ, chữa lành nỗi đau, đối mặt với thực tế"
            },
            "pic": "15-恶魔"
            },
            "16": {
            "name_cn": "高塔",
            "name_en": "The Tower",
            "type": "MajorArcana",
            "meaning": {
                "up": "Biến đổi sắc nét, biến động đột ngột, tái sinh sau khi hủy diệt, thay đổi chế độ",
                "down": "Kiềm chế trước ranh giới, sợ thay đổi, đấu đá nội bộ, bình lặng trước cơn bão"
            },
            "pic": "16-高塔"
            },
            "17": {
            "name_cn": "星星",
            "name_en": "The Star",
            "type": "MajorArcana",
            "meaning": {
                "up": "Hy vọng, tương lai tươi sáng, bình minh ló dạng",
                "down": "Quá tham vọng, hay thay đổi, phản tác dụng, mất mục đích"
            },
            "pic": "17-星星"
            },
            "18": {
            "name_cn": "月亮",
            "name_en": "The Moon",
            "type": "MajorArcana",
            "meaning": {
                "up": "Không thật, không thoải mái và lung lay, bối rối, dối trá",
                "down": "Tình hình đang dần được cải thiện, những nghi ngờ đang mờ dần và nỗi sợ hãi đã được giải quyết"
            },
            "pic": "18-月亮"
            },
            "19": {
            "name_cn": "太阳",
            "name_en": "The Sun",
            "type": "MajorArcana",
            "meaning": {
                "up": "Tràn đầy sức sống, tươi sáng và tích cực",
                "down": "Chán nản, chán nản, bất lực, tiêu cực"
            },
            "pic": "19-太阳"
            },
            "20": {
            "name_cn": "审判",
            "name_en": "Judgement",
            "type": "MajorArcana",
            "meaning": {
                "up": "Tài lộc tăng up, niềm vui hồi sinh, sức khỏe hồi phục",
                "down": "chán nản, vượt qua trước khi nó bắt đầu, tự nghi ngờ, bác bỏ"
            },
            "pic": "20-审判"
            },
            "21": {
            "name_cn": "世界",
            "name_en": "The World",
            "type": "MajorArcana",
            "meaning": {
                "up": "điều ước hoàn thành, thành công, đích đến",
                "down": "Không thể cam kết, bất an với hiện trạng, bỏ cuộc giữa chừng, chấp nhận một cách mù quáng"
            },
            "pic": "21-世界"
            },
            "22": {
            "name_cn": "宝剑ACE",
            "name_en": "Ace of Swords",
            "type": "Swords",
            "meaning": {
                "up": "Tích cực và xông xáo, nhạy bén, hợp lý, khởi đầu thành công",
                "down": "Kích thích tranh cãi, hung hăng và tai hại, hống hách, ý tưởng bất công"
            },
            "pic": "宝剑-01"
            },
            "23": {
            "name_cn": "宝剑2",
            "name_en": "II of Swords",
            "type": "Swords",
            "meaning": {
                "up": "ý kiến đối lập, thời điểm lựa chọn, bất đồng và xu hướng ngầm",
                "down": "Có lựa chọn nhưng tin đồn và lừa dối xuất hiện, do dự dẫn đến bỏ lỡ cơ hội"
            },
            "pic": "宝剑-02"
            },
            "24": {
            "name_cn": "宝剑3",
            "name_en": "III of Swords",
            "type": "Swords",
            "meaning": {
                "up": "Cảm thấy tổn thương, phiền muộn trong cuộc sống, tủi thân",
                "down": "Khép kín tâm lý, rối loạn cảm xúc, trốn tránh, làm tổn thương những người xung quanh"
            },
            "pic": "宝剑-03"
            },
            "25": {
            "name_cn": "宝剑4",
            "name_en": "IV of Swords",
            "type": "Swords",
            "meaning": {
                "up": "Bổ sung năng lượng, rút lui làm tiến, hành động chậm lại, chú ý tóm tắt",
                "down": "hãy hành động ngay, nhảy vào cuộc sống, vội vàng khi chưa chuẩn bị đầy đủ"
            },
            "pic": "宝剑-04"
            },
            "26": {
            "name_cn": "宝剑5",
            "name_en": "V of Swords",
            "type": "Swords",
            "meaning": {
                "up": "Mâu thuẫn, hại nhau vô cớ, thắng trận mà thua tình",
                "down": "Tìm ra giải pháp, xung đột có khả năng được giải quyết và cả hai bên đều sẵn sàng hạ vũ khí"
            },
            "pic": "宝剑-05"
            },
            "27": {
            "name_cn": "宝剑6",
            "name_en": "VI of Swords",
            "type": "Swords",
            "meaning": {
                "up": "Vết thương đã lâu không lành, hiện tại không có biện pháp tốt, sau này còn khó khăn hơn nữa",
                "down": "mắc kẹt trong rắc rối, liều lĩnh giải quyết trong khi bỏ qua những vấn đề lớn hơn phía sau, cần sự giúp đỡ hoặc giải cứu từ người khác"
            },
            "pic": "宝剑-06"
            },
            "28": {
            "name_cn": "宝剑7",
            "name_en": "VII of Swords",
            "type": "Swords",
            "meaning": {
                "up": "Sơ suất, thâm thù bất lộ, thủ đoạn phi thường hay tiểu xảo không dùng được lâu",
                "down": "may mắn bất ngờ, kế hoạch xấu, lừa dối"
            },
            "pic": "宝剑-07"
            },
            "29": {
            "name_cn": "宝剑8",
            "name_en": "VIII of Swords",
            "type": "Swords",
            "meaning": {
                "up": "Bị cô lập, bất lực, mắc kẹt trong hoàn cảnh khó khăn, mắc kẹt trong những suy nghĩ cản trở hành động",
                "down": "Ra khỏi xiềng xích, thoát khỏi khủng hoảng, làm lại từ đầu"
            },
            "pic": "宝剑-08"
            },
            "30": {
            "name_cn": "宝剑9",
            "name_en": "IX of Swords",
            "type": "Swords",
            "meaning": {
                "up": "Tinh thần sợ hãi, sợ hãi, lo lắng, điềm báo khó khăn phía trước",
                "down": "Mọi thứ xoay chuyển, thoát khỏi rắc rối, sống trong quá khứ, đối mặt với thực tế"
            },
            "pic": "宝剑-09"
            },
            "31": {
            "name_cn": "宝剑10",
            "name_en": "X of Swords",
            "type": "Swords",
            "meaning": {
                "up": "Tiến độ bị chặn nghiêm trọng, không lối thoát, vô vọng, cơ hội reset về 0",
                "down": "Sự sống sót từ tuyệt vọng, hy vọng trở lại, những điều cực đoan sẽ đảo ngược"
            },
            "pic": "宝剑-10"
            },
            "32": {
            "name_cn": "宝剑国王",
            "name_en": "King of Swords",
            "type": "Swords",
            "meaning": {
                "up": "Công lý, Quyền lực, Lãnh đạo, Bình tĩnh",
                "down": "tư duy thiên lệch, áp đặt tư tưởng, cực đoan, vô nguyên tắc"
            },
            "pic": "宝剑国王"
            },
            "33": {
            "name_cn": "宝剑王后",
            "name_en": "Queen of Swords",
            "type": "Swords",
            "meaning": {
                "up": "hợp lý, suy nghĩ nhanh, khoảng cách, công bằng",
                "down": "bướng bỉnh, cực đoan, kiêu căng, độc đoán"
            },
            "pic": "宝剑王后"
            },
            "34": {
            "name_cn": "宝剑骑士",
            "name_en": "Knight of Swords",
            "type": "Swords",
            "meaning": {
                "up": "Hành động dũng cảm, đầy đam mê",
                "down": "kế hoạch kém, giàu trí tưởng tượng, thiếu kiên nhẫn, phát ban, tự phụ"
            },
            "pic": "宝剑骑士"
            },
            "35": {
            "name_cn": "宝剑侍从",
            "name_en": "Page of Swords",
            "type": "Swords",
            "meaning": {
                "up": "Suy nghĩ khác biệt, sáng suốt, phán đoán thận trọng",
                "down": "phân tích thông tin thiển cận, phản khí hậu, không được lọc"
            },
            "pic": "宝剑侍从"
            },
            "36": {
            "name_cn": "权杖ACE",
            "name_en": "Ace of Wands",
            "type": "Wands",
            "meaning": {
                "up": "Khởi đầu mới, cơ hội mới, đam mê cháy bỏng, sáng tạo",
                "down": "Hành động mới có khả năng thất bại cao hơn, khởi đầu kém, ý chí yếu"
            },
            "pic": "权杖-01"
            },
            "37": {
            "name_cn": "权杖2",
            "name_en": "II of Wands",
            "type": "Wands",
            "meaning": {
                "up": "Nhìn về phía trước, up kế hoạch cho tương lai, lựa chọn giữa thói quen và hy vọng",
                "down": "Do dự, hành động bị chặn, dành quá nhiều thời gian để lựa chọn"
            },
            "pic": "权杖-02"
            },
            "38": {
            "name_cn": "权杖3",
            "name_en": "II of Wands",
            "type": "Wands",
            "meaning": {
                "up": "Thời điểm thích hợp để khám phá, phù hợp với tâm hồn, khả năng lãnh đạo, sự thống trị",
                "down": "Hợp tác kém, thiếu lãnh đạo, bất hòa trong nhóm"
            },
            "pic": "权杖-03"
            },
            "39": {
            "name_cn": "权杖4",
            "name_en": "IV of Wands",
            "type": "Wands",
            "meaning": {
                "up": "Hòa bình và thịnh vượng, mối quan hệ ổn định, học hành ổn định hoặc phát triển nghề nghiệp",
                "down": "Mất cân bằng, nền tảng bị phá vỡ, các mối quan hệ nghèo nàn, thu hoạch kém"
            },
            "pic": "权杖-04"
            },
            "40": {
            "name_cn": "权杖5",
            "name_en": "V of Wands",
            "type": "Wands",
            "meaning": {
                "up": "Cạnh tranh, xung đột, mâu thuẫn nội tâm, thiếu đồng thuận",
                "down": "Cạnh tranh không lành mạnh, đồng thuận"
            },
            "pic": "权杖-05"
            },
            "41": {
            "name_cn": "权杖6",
            "name_en": "VI of Wands",
            "type": "Wands",
            "meaning": {
                "hướng up": "Chiến thắng, thành công được đền đáp, suôn sẻ, đầy hy vọng",
                "down": "thành công ngắn ngủi, tự mãn, mất tự tin"
            },
            "pic": "权杖-06"
            },
            "42": {
            "name_cn": "权杖7",
            "name_en": "VII of Wands",
            "type": "Wands",
            "meaning": {
                "up": "Niềm tin mãnh liệt, thái độ kiên định, nội tại cân bằng và quyết tâm, tin tưởng vào quan điểm và khả năng của bản thân",
                "down": "Nghi ngờ về khả năng của một người, thiếu tự tin và lái xe, thiếu ý chí"
            },
            "pic": "权杖-07"
            },
            "43": {
            "name_cn": "权杖8",
            "name_en": "VIII of Wands",
            "type": "Wands",
            "meaning": {
                "up": "Mục tiêu rõ ràng, nỗ lực mạnh mẽ, tiến bộ nhanh chóng, rèn luyện trong khi sắt còn nóng, đi du lịch",
                "down": "Đi sai hướng, hành động không nhất quán, bốc đồng, chậm trễ trong kế hoạch"
            },
            "pic": "权杖-08"
            },
            "44": {
            "name_cn": "权杖9",
            "name_en": "IX of Wands",
            "type": "Wands",
            "meaning": {
                "up": "Chuẩn bị khó khăn, tự vệ, đĩnh đạc, đối kháng lực lượng",
                "down": "Nghịch cảnh, mất tự tin, tinh thần thấp"
            },
            "pic": "权杖-09"
            },
            "45": {
            "name_cn": "权杖10",
            "name_en": "X of Wands",
            "type": "Wands",
            "meaning": {
                "up": "Tinh thần trách nhiệm, nhiệt huyết bên trong, làm việc quá sức, quá sức",
                "down": "Căng thẳng không thể chịu đựng được, đánh giá quá cao khả năng của bản thân, tự điều chỉnh bản thân, trốn tránh trách nhiệm"
            },
            "pic": "权杖-10"
            },
            "46": {
            "name_cn": "权杖国王",
            "name_en": "King of Wands",
            "type": "Wands",
            "meaning": {
                "up": "Hành động mạnh mẽ, thái độ rõ ràng, lập chiến lược, lãnh đạo lôi cuốn",
                "down": "Tùy tiện, khắc nghiệt, kiêu ngạo"
            },
            "pic": "权杖国王"
            },
            "47": {
            "name_cn": "权杖王后",
            "name_en": "Queen of Wands",
            "type": "Wands",
            "meaning": {
                "up": "Cả cứng rắn và mềm mại, nhiệt tình và dịu dàng, lạc quan và sôi nổi",
                "down": "cảm xúc, sự tự tin thấp, sự nhiệt tình suy giảm, sự cô đơn"
            },
            "pic": "权杖王后"
            },
            "48": {
            "name_cn": "权杖骑士",
            "name_en": "Knight of Wands",
            "type": "Wands",
            "meaning": {
                "up": "di động, năng lượng, hành trình mới, thay đổi không thỏa mãn so với hiện trạng",
                "down": "liều lĩnh, liều lĩnh, chậm trễ trong hành động, không có kế hoạch, thiếu kiên nhẫn"
            },
            "pic": "权杖骑士"
            },
            "49": {
            "name_cn": "权杖侍从",
            "name_en": "Page of Wands",
            "type": "Wands",
            "meaning": {
                "up": "Kế hoạch mới bắt đầu, thử điều mới, tin vui đến",
                "down": "Ba phút hăng hái, lập kế hoạch quá lâu dẫn đến tiến độ kém, tin xấu"
            },
            "pic": "权杖侍从"
            },
            "50": {
            "name_cn": "圣杯ACE",
            "name_en": "Ace of Cups",
            "type": "Cups",
            "meaning": {
                "up": "Tình yêu mới hoặc tình bạn mới, niềm vui tinh thần, sự hài lòng về tinh thần",
                "down": "Thiếu cảm xúc, thiếu giao tiếp, đạo đức giả"
            },
            "pic": "圣杯-01"
            },
            "51": {
            "name_cn": "圣杯2",
            "name_en": "II of Cups",
            "type": "Cups",
            "meaning": {
                "up": "Mối quan hệ hài hòa và bình đẳng, tình yêu lẫn nhau giữa những người yêu nhau, hợp tác suôn sẻ",
                "down": "Mối quan hệ giới có xu hướng cực đoan, chia rẽ tình cảm, bất bình đẳng, xung đột"
            },
            "pic": "圣杯-02"
            },
            "52": {
            "name_cn": "圣杯3",
            "name_en": "III of Cups",
            "type": "Cups",
            "meaning": {
                "up": "Hợp tác đạt kết quả, phấn đấu đạt kết quả",
                "down": "Cực vui sinh sầu, không đồng lòng, đội ngũ bất hòa"
            },
            "pic": "圣杯-03"
            },
            "53": {
            "name_cn": "圣杯4",
            "name_en": "IV of Cups",
            "type": "Cups",
            "meaning": {
                "up": "Mệt mỏi, thiếu động lực, không còn hứng thú với mọi thứ, tâm trạng chán nản",
                "down": "Mối quan hệ mới, hành động, hết thủy triều"
            },
            "pic": "圣杯-04"
            },
            "54": {
            "name_cn": "圣杯5",
            "name_en": "V of Cups",
            "type": "Cups",
            "meaning": {
                "up": "Quá để ý đến những thứ đã mất, tự trách mình, thiếu tự tin, từ chối sự giúp đỡ từ bên ngoài do xa cách",
                "down": "Ra khỏi đau buồn, phá thuyền, trở lại"
            },
            "pic": "圣杯-05"
            },
            "55": {
            "name_cn": "圣杯6",
            "name_en": "VI of Cups",
            "type": "Cups",
            "meaning": {
                "up": "Nỗi nhớ, kỉ niệm đẹp, cảm xúc trong sáng, niềm vui giản đơn, an ninh",
                "down": "Nghiện quá khứ, ký ức tồi tệ, không muốn bị ràng buộc"
            },
            "pic": "圣杯-06"
            },
            "56": {
            "name_cn": "圣杯7",
            "name_en": "VII of Cups",
            "type": "Cups",
            "meaning": {
                "up": "Những tưởng tượng viển vông, những mối quan hệ viển vông, những cảm xúc hão huyền, cuộc sống bộn bề",
                "down": "Nhìn rõ thực tế, không hài lòng với những thứ vật chất và đưa ra những lựa chọn sáng suốt"
            },
            "pic": "圣杯-07"
            },
            "57": {
            "name_cn": "圣杯8",
            "name_en": "VIII of Cups",
            "type": "Cups",
            "meaning": {
                "up": "Lìa bỏ người và vật quen thuộc, không ham thành tích hiện tại, suy xét mà hành động",
                "down": "Do dự, mất kế hoạch tương lai, hiện trạng"
            },
            "pic": "圣杯-08"
            },
            "58": {
            "name_cn": "圣杯9",
            "name_en": "IX of Cups",
            "type": "Cups",
            "meaning": {
                "up": "Mong muốn rất có thể thành hiện thực, toại nguyện hiện trạng, giàu có về vật chất và tinh thần",
                "down": "Mất mát vật chất, thiếu kiềm chế, mưu cầu hạnh phúc cao hơn"
            },
            "pic": "圣杯-09"
            },
            "59": {
            "name_cn": "圣杯10",
            "name_en": "X of Cups",
            "type": "Cups",
            "meaning": {
                "up": "Đội ngũ hài hòa, mối quan hệ giữa các cá nhân hài hòa, gia đình hòa thuận",
                "down": "Đội bất hòa, bất hòa giữa các cá nhân, xung đột"
            },
            "pic": "圣杯-10"
            },
            "60": {
            "name_cn": "圣杯国王",
            "name_en": "King of Cups",
            "type": "Cups",
            "meaning": {
                "up": "Sáng tạo, quyền quyết định, chuyên môn trong một lĩnh vực nhất định, chia sẻ hoặc trao đổi có điều kiện",
                "down": "sự trùng lặp, động cơ thầm kín, không tin tưởng vào khả năng tự sáng tạo"
            },
            "pic": "圣杯国王"
            },
            "61": {
            "name_cn": "圣杯王后",
            "name_en": "Queen of Cups",
            "type": "Cups",
            "meaning": {
                "up": "Cảm xúc phong phú và tinh tế, nhấn mạnh trực giác và suy nghĩ cảm tính",
                "down": "Quá xúc động, thiếu chú ý, bị cô lập về tinh thần"
            },
            "pic": "圣杯王后"
            },
            "62": {
            "name_cn": "圣杯骑士",
            "name_en": "Knight of Cups",
            "type": "Cups",
            "meaning": {
                "up": "Quyết định giữa chờ đợi và hành động, cơ hội mới đang đến",
                "down": "Sử dụng cảm xúc không đủ, chờ đợi thụ động, hành động sai theo cảm xúc"
            },
            "pic": "圣杯骑士"
            },
            "63": {
            "name_cn": "圣杯侍从",
            "name_en": "Page of Cups",
            "type": "Cups",
            "meaning": {
                "up": "Thể hiện cảm xúc và cống hiến, sắp có tin vui, theo đuổi tình cảm nhưng chưa trưởng thành",
                "down": "Theo đuổi tình cảm nhưng sai lầm, cảm xúc mơ hồ, quá gắn bó với cảm xúc hoặc vấn đề"
            },
            "pic": "圣杯侍从"
            },
            "64": {
            "name_cn": "星币ACE",
            "name_en": "Ace of Pentacles",
            "type": "Pentacles",
            "meaning": {
                "up": "Cơ hội mới, phát triển thuận lợi, lợi nhuận vật chất",
                "down": "Tiền mất, kém phát triển, vật chất dồi dào nhưng trống rỗng tinh thần"
            },
            "pic": "星币-01"
            },
            "65": {
            "name_cn": "星币2",
            "name_en": "II of Pentacles",
            "type": "Pentacles",
            "meaning": {
                "up": "Cán cân thanh toán, luân chuyển của cải, biến động và cân bằng cuộc sống",
                "down": "Sử dụng tiền quá mức, khó duy trì sự cân bằng, đối mặt với tổn thất vật chất"
            },
            "pic": "星币-02"
            },
            "66": {
            "name_cn": "星币3",
            "name_en": "III of Pentacles",
            "type": "Pentacles",
            "meaning": {
                "up": "Làm việc theo nhóm, giao tiếp trôi chảy, tay nghề cao, mối quan hệ ổn định",
                "down": "Phân công lao động không rõ ràng, quan hệ giữa người với người không hài hòa, trình độ chuyên môn còn thiếu"
            },
            "pic": "星币-03"
            },
            "67": {
            "name_cn": "星币4",
            "name_en": "IV of Pentacles",
            "type": "Pentacles",
            "meaning": {
                "up": "Tận tâm, bủn xỉn, bủn xỉn, của cải trì trệ, thiếu thốn tinh thần",
                "down": "Sống ngoài khả năng của mình, ngông cuồng, ngông cuồng"
            },
            "pic": "星币-04"
            },
            "68": {
            "name_cn": "星币5",
            "name_en": "V of Pentacles",
            "type": "Pentacles",
            "meaning": {
                "up": "Khủng hoảng kinh tế, cùng khổ, khó khăn",
                "down": "Vấn đề nơi ở, cuộc sống bộn bề, ly lao và nuốt chửng"
            },
            "pic": "星币-05"
            },
            "69": {
            "name_cn": "星币6",
            "name_en": "VI of Pentacles",
            "type": "Pentacles",
            "meaning": {
                "up": "hào phóng, cho đi, có đi có lại, ổn định về tài chính và lạc quan",
                "down": "ích kỷ, mưu mô, mắc nợ, hoặc mắc nợ người khác"
            },
            "pic": "星币-06"
            },
            "70": {
            "name_cn": "星币7",
            "name_en": "VII of Pentacles",
            "type": "Pentacles",
            "meaning": {
                "up": "Chờ thời gian chín muồi, đạt được kết quả theo từng giai đoạn và nghĩ về kế hoạch",
                "down": "Nỗ lực gấp đôi, nỗ lực một nửa, đầu tư thất bại, do dự"
            },
            "pic": "星币-07"
            },
            "71": {
            "name_cn": "星币8",
            "name_en": "VIII of Pentacles",
            "type": "Pentacles",
            "meaning": {
                "up": "Làm việc tập trung, lành nghề, năng nổ, có tổ chức",
                "down": "Mất tập trung, công việc buồn tẻ, hiệu quả công việc kém"
            },
            "pic": "星币-08"
            },
            "72": {
            "name_cn": "星币9",
            "name_en": "IX of Pentacles",
            "type": "Pentacles",
            "meaning": {
                "up": "Sự nghiệp thăng tiến, tiếp tục tạo điều kiện thuận lợi cho bản thân, biết tiết kiệm chi tiêu",
                "down": "Mất của cải, bỏ tiền theo đuổi cuộc sống, thiếu khả năng quản lý"
            },
            "pic": "星币-09"
            },
            "73": {
            "name_cn": "星币10",
            "name_en": "X of Pentacles",
            "type": "Pentacles",
            "meaning": {
                "up": "Đội hòa hợp, đối tác kinh doanh thành công, gia đình hòa thuận",
                "down": "Đội bất hòa, hợp tác đầu tư bị đình chỉ, gia đình bất hòa"
            },
            "pic": "星币-10"
            },
            "74": {
            "name_cn": "星币国王",
            "name_en": "King of Pentacles",
            "type": "Pentacles",
            "meaning": {
                "up": "Người thành đạt, trọng vật chất, giỏi quản lý, đáng tin cậy, trưởng thành và thực dụng",
                "down": "Thiếu nhạy bén về kinh tế, thiếu niềm tin, quản lý yếu kém, mất niềm tin"
            },
            "pic": "星币国王"
            },
            "75": {
            "name_cn": "星币王后",
            "name_en": "Queen of Pentacles",
            "type": "Pentacles",
            "meaning": {
                "up": "trưởng thành, thịnh vượng, đáng tin cậy, ấm áp, yên bình",
                "down": "sự phù phiếm, cuộc sống hào nhoáng, thái độ tồi tệ"
            },
            "pic": "星币王后"
            },
            "76": {
            "name_cn": "星币骑士",
            "name_en": "Knight of Pentacles",
            "type": "Pentacles",
            "meaning": {
                "up": "Chú trọng hiệu quả, tinh thần trách nhiệm, cẩn trọng, có kế hoạch",
                "down": "Tư duy buông thả, bảo thủ, trì trệ phát triển"
            },
            "pic": "星币骑士"
            },
            "77": {
            "name_cn": "星币侍从",
            "name_en": "Page of Pentacles",
            "type": "Pentacles",
            "meaning": {
                "up": "giỏi suy nghĩ và học hỏi, ham học hỏi, tin tức tốt liên quan đến kiến thức hoặc công việc nghiên cứu",
                "down": "Kiến thức kém, thiếu tự giác, thất thoát tài chính, tầm nhìn hạn hẹp"
            },
            "pic": "星币侍从"
            }
        }
    }
}

