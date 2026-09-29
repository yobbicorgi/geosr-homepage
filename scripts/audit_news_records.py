#!/usr/bin/env python3
"""Index all preserved news bodies for dated, source-bound editorial review."""
from __future__ import annotations

import collections
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs/source-migration"

# These notes result from reading the relevant original bodies, not title inference.
# They describe the published statement and do not independently validate a claim.
REVIEW = {
    254: ("company_external_media", "도서에서 GeoSR의 환경보존 조사 및 해양조사를 언급한 과거 소개 외부 저자의 평가를 회사 자체 우월성 주장으로 전용하지 않음"),
    187: ("staff_historical", "2005-06-20 홈페이지 재개설 사내 설명회 현재 사이트 오픈 공지가 아님"),
    221: ("company_outreach", "과거 연안정책 심포지움에서 남수용 박사의 연안침식 모니터링 현황 발표 회사가 모든 발표 및 정책사업을 수행한 것은 아님"),
    455: ("staff_historical", "김홍선 대표의 해양수산기업협회장 연임 과거 기사 현재 회사 대표 및 협회 임기 증빙으로 사용하지 않음"),
    451: ("individual_recognition", "남수용 부사장 개인 대통령 포장 회사 법인 인증과 구분"),
    1997: ("company_csr", "희망2025 나눔캠페인 행사 참여 관련 기사 당시 후원 활동 기록"),
    1: ("test_record", "테스트 글 원문은 보존하되 회사 대표 소식으로 노출하지 않음"),
    3091: ("company_technology", "2026년 해양수산부 신기술 인증 공지 단일 케이블로 다층 수온을 동시에 측정하는 시스템 첨부 공고와 대조할 것"),
    3092: ("company_technology", "3091과 동일한 신기술 인증 보도 외부 기사 링크이며 별도 기술 실적으로 중복 집계하지 않음"),
    458: ("company_research", "2017-07-12 기사 국립환경과학원 의뢰 4대강 14개 보 퇴적물 용출 조사에 한양대 세종대 이대 GeoSR 등이 참여 회사 단독 연구로 표현하지 않음"),
    1886: ("company_research", "환경생태부의 갯벌 자정능력 연구 참여 공지 연구 전체를 GeoSR 단독 성과나 세계 최초 회사 성과로 확대하지 않음"),
    1543: ("company_project", "경상북도 연안침식 실태조사 관련 TBC 2023-05-19 방송 공지"),
    436: ("company_project", "울산항 해상관측 시스템 구축 현장 관측소와 해저 계류 장비 설명 사업연도는 게시일만으로 추정하지 않음"),
    420: ("company_technology", "무인원격 수질 및 기상환경 모니터링 선박 특허 등록일은 본문 2009-02-04 현재 신규 기술로 표현하지 않음"),
    453: ("company_outreach", "2015-05-29 방송 MBC 다큐프라임 해안침식 제작 참여"),
    1436: ("company_research", "2012-07-25 보도 OCEAN과 공동 낙동강 쓰레기 거제도 이동 연구 2011년 피해 수치와 현재 관측치를 혼동하지 않음"),
    1435: ("company_project", "2011-12-09 보도 KOICA 남태평양 피지 신재생에너지 사업 관련 과거 활동"),
    1437: ("company_project", "2013-02-15 MBC 보도 KOICA 피지 사업 관련 과거 활동"),
    1427: ("company_profile_historical", "하천 호수 해양의 흐름 확산 지형 생태 및 폭풍해일 수치모델 설명 기사연도 불명이며 게시일을 수행연도로 사용하지 않음"),
    1440: ("company_technology", "2017 박람회 GeoSR 수온 염분 녹조 기상 관측과 30분 간격 앱 전송 및 그물 높이 조절 설명 사료 공급과 AI 설명의 주체는 다른 단체이므로 회사 성과로 전용 금지"),
    220: ("company_research", "2005-11-08 보도 해양수산부와 GeoSR 연안침식 보고서 당시 13개 해빈 조사 수치는 현재 침식 상태가 아님"),
    224: ("company_project", "명사십리 2004년 이후 비디오 모니터링 타워 2곳 카메라 해안선 7대 파랑 1대 설명 현재 장비 설치 상태로 단정하지 않음"),
    223: ("company_project", "이호해변 초기 모니터링 자료 보고 당시 데이터 부족으로 침식 원인 단정 불가라는 본문 한계를 함께 유지"),
    222: ("company_research", "해양수산부와 GeoSR의 한국연안침식 모니터링 보고서를 다루는 과거 기고"),
    210: ("company_project", "2005-10-19 보도 이호해변 비디오 3대와 인터넷 실시간 전송 구축 현재 운영 보증이 아님"),
    1415: ("company_research", "남수용 박사팀의 전국 연안침식 조사 과거 발표 178개소 등 수치는 당시 발표 범위임"),
    1424: ("company_research", "해양수산부가 GeoSR 등에 의뢰한 62개 해변 사구 조사 과거 기사 등급 수치를 현재 상태로 전용하지 않음"),
    1430: ("company_project", "GeoSR과 아라기술의 경북 연안 모니터링 기사 2008년 2009년 비교 수치를 담은 과거 결과"),
    1417: ("company_profile_historical", "2004-05-27 회사 소개 당시 약 40명 25억원 매출 ADCP 국내 유일 등 표현은 현재 회사 소개 근거로 재사용 금지"),
    1871: ("company_location_historical", "2024년 삼척 환동해권사무소 개소 보도 현재 회사 연락처의 군포 부산 포항 목록과 일치하지 않음 현재 운영 여부 별도 확인 전 주소 목록에 추가하지 않음"),
    190: ("recruitment_historical", "과거 채용의 하천 호소 하구 연안 해양 모델 분야는 업무 이해 근거 과거 주소 전화 담당자 지원조건은 현재 채용 화면에 복사하지 않음"),
    421: ("recruitment_historical", "측량 과거 채용 공고 과거 금정동 주소와 송무락 담당자 정보를 현행 채용으로 사용하지 않음"),
    432: ("recruitment_historical", "측량 과거 채용 공고 421과 유사한 내용 원문은 유지하되 현재 채용 조건과 분리"),
    424: ("recruitment_historical", "2009-06-10~20 전기 전자 통신 채용 성별 연령 조건을 현행 채용 문구에 옮기지 않음"),
    1692: ("company_publication", "승영호 Q&A 해양역학 비매품 PDF 무료 학습용 공개 책 본문에 출판사 및 저자 동의 없는 일부 재사용 제한이 있음 원래 다운로드 보존과 홍보 이미지 발췌를 구분"),
    438: ("company_publication", "2010년 12월 항만설계기준 핸드북 김태인 파랑 편 집필 참여 당시 직함 유지"),
    469: ("company_csr", "2018-09-07 오이도 국제연안정화 활동 2018-09-17 기사 25명 149.4kg은 당시 활동 수치"),
    468: ("company_recognition_historical", "2018년 좋은 중소기업 기사 다른 회사의 복지 사례도 함께 등장 GeoSR 복지로 전용하지 않음"),
    325: ("company_recognition_historical", "ISO9001 관련 본문 행사일 2006-12-07 연혁의 다른 연도와 임의 통합하지 않음 현재 유효성 보증 아님"),
    350: ("company_recognition_historical", "Inno-Biz Aa등급 당시 인증 설명 현재 인증 유효성이나 현재 상위 5퍼센트 주장 근거가 아님"),
    377: ("company_recognition_historical", "2007 유망기업 과거 ISO Inno-Biz 및 당시 특허 수를 현재 보유 현황으로 사용하지 않음"),
    378: ("company_recognition_historical", "특허 6건 출원 2건 실용신안 2건은 과거 게시글 시점 현재 자산 수와 혼동하지 않음"),
    437: ("company_recognition_historical", "경기중소기업대상 기술혁신분야 본문 행사일 2010-12-17"),
    426: ("company_recognition_historical", "성장기업 관련 본문 2009-07-02 과거 선정 기록"),
    397: ("company_recognition_historical", "연구개발서비스업 등록 본문 2008-04-14 현재 등록 상태나 자격 유효성 별도"),
    435: ("company_recognition_historical", "2010-04-08 신용등급 상향 공지 구체 등급과 현재 신용등급으로 확장하지 않음"),
    439: ("company_recognition_historical", "해양환경 측정분석 인증 공지 현재 유효성을 게시글만으로 보증하지 않음"),
    467: ("company_recognition_historical", "장보고대상 해양수산부 장관상 본문 행사일 2018-12-14"),
    324: ("individual_recognition", "김홍선 개인 장관상 2006-12-29 회사 법인 인증과 구분"),
    330: ("staff_historical", "2007-02-16 정기 포상식 직원 명단 및 직급은 당시 기준"),
    425: ("staff_historical", "2009-07-03 사내 야유회 공지 과거 일정"),
    445: ("staff_historical", "2012-03-01 김홍선 겸임교수 위촉 과거 개인 이력"),
    446: ("company_outreach", "2012-04-19 Idronaut 장비 기술 세미나 자체 개발 장비나 독점 공급 계약 근거가 아님"),
    447: ("company_outreach", "2012 여수 Oceans 전시 관측 수치모델 연안침식 실시간시스템 소개 및 발표"),
    422: ("company_outreach", "NOAA 관계자 방문 및 협력방안 논의 공식 파트너 계약 체결로 확대하지 않음"),
    452: ("company_csr", "세월호 관련 지원 감사 표명 사고 당시 지원 이력을 맥락 없이 홍보 사례로 확대하지 않음"),
    1428: ("company_outreach", "해양경찰청 기술협력 연구협의회에 GeoSR 참여 개별 방제기술 개발 전부를 회사 성과로 주장하지 않음"),
    1426: ("company_outreach", "해양기업협회 발기인 참여 과거 기사"),
    1429: ("company_outreach", "2009 해양과학 취업설명회 참가 현재 채용공고가 아님"),
    456: ("external_link_mismatch", "제목은 어업정책 포럼인데 457과 동일 기사 URL을 사용 원본 링크 오류를 추정 수정하지 않음"),
    457: ("external_link_review", "이사부호 연구 관련 외부 기사 링크만 있음 회사 역할을 링크 제목에서 확대하지 않음"),
    407: ("industry_news", "정부 영산강하구 심포지움 기사 이해당사자라는 문자열은 회사 당사 표현이 아님"),
    367: ("industry_news", "기후변화 외교 좌담회 기사 협약 당사자 및 당사국 표현은 회사 언급이 아님"),
    428: ("industry_news", "경인 관측 기사 주체는 국립해양조사원 회사 참여가 본문에 명시되지 않음"),
    431: ("industry_news", "조류에너지 자원지도 기사 주체는 국립해양조사원 회사 수행으로 전용하지 않음"),
    256: ("industry_news", "연안 관측망 22개소 관련 주체는 국립수산과학원 회사 보유 관측망으로 전용하지 않음"),
    361: ("industry_news", "Marine GIS 정부 사업 기사 회사 참여가 명시되지 않음"),
    215: ("industry_news", "인천 155개 섬 조사 의뢰 대상은 인하대 관련 기관 회사 실적으로 전용하지 않음"),
    1946: ("company_external_media", "매일경제TV 극찬기업 GeoSR 유튜브 소개 링크 영상 내용을 로컬 본문 근거로 검증했다고 주장하지 않음"),
    1885: ("company_external_media", "연구개발 성과 관련 외부 기사 링크 1위라는 제목을 별도 검증 없이 상시 회사 광고 문구로 사용하지 않음"),
    1693: ("company_external_media", "당시 김홍선 대표 인터뷰 현행 대표자 표기는 회사 소개의 김기연과 구분"),
    1999: ("company_external_media", "당시 김홍선 대표 인터뷰 기사 현재 대표자 및 기사 밖 연구 성과를 추정하지 않음"),
    1947: ("company_external_media", "당시 김홍선 대표 인터뷰 원문 기사 제목의 평가 표현을 홈페이지 자체 주장으로 전용하지 않음"),
    1438: ("company_external_media", "과거 김홍선 대표 인터뷰 링크 현재 인물 직책으로 전용하지 않음"),
    1433: ("company_advertisement_historical", "2011-09-07 동아일보 광고 스캔 과거 원문 보존용"),
    1964: ("company_recognition_historical", "2024년 제1회 일생활균형 우수기업 기사 선정 시점 기록 현재 자동 갱신된 인증으로 주장하지 않음"),
    1965: ("company_recognition_historical", "1964와 같은 일생활균형 선정의 회사 공지 별도 독립 인증 두 건으로 세지 않음"),
}


def main():
    records = json.loads((ROOT / "dist/source-archive.json").read_text(encoding="utf-8"))["records"]
    news = [row for row in records if row["kind"] in {"notices", "press"}]
    ledger = []
    for record in news:
        lines = record["text"].splitlines()
        number = int(record["id"].split("-")[-2])
        date = lines[1] if len(lines) > 1 and re.fullmatch(r"20\d\d-\d\d-\d\d", lines[1]) else ""
        body = "\n".join(lines[2:] if date else lines[1:])
        without_urls = re.sub(r"https?://\S+", "", body)
        dates = sorted(set(re.findall(r"(?:19|20)\d{2}\s*(?:[-./]|년)\s*\d{1,2}\s*(?:[-./]|월)\s*\d{1,2}\s*일?", without_urls)))
        years = sorted(set(re.findall(r"(?<!\d)((?:19|20)\d{2})(?!\d)", without_urls)))
        explicit_company = bool(re.search(r"지오시스템\s*리서치|GeoSR|당사(?![국자])|우리\s*회사", body, re.I))
        title = record["title"]
        if "이재학의 해양" in title:
            category, caution = "individual_column", "고문 개인의 해양과학 기고이며 회사 수행사업이나 자체 연구성과를 의미하지 않음"
        elif re.search(r"채용|모집", title):
            category, caution = "recruitment_historical", "원문 게시 시점 채용 공고 현행 채용 조건 담당자 및 지원기간으로 전용하지 않음"
        elif re.search(r"부고|결혼|혼인|돌잔치|출산|승진|취임|포상식", title):
            category, caution = "staff_historical", "사내 인사 경조 및 행사 기록 당시 이름 직급과 일정은 현재 조직 정보가 아님"
        elif re.search(r"\([^)]*(?:선임|책임|수석|부장|차장|이사|회장|고문)[^)]*\)", title):
            category, caution = "individual_recognition", "개인 수상과 당시 직함을 회사 법인 인증 또는 현재 임직원 현황으로 사용하지 않음"
        elif explicit_company and re.search(r"인증|선정|감사패|표창|수상|장관상|기업대상", title):
            category, caution = "company_recognition_historical", "게재 시점 선정 및 수상 기록 현재 인증의 유효성과 갱신 여부는 별도 근거 필요"
        elif explicit_company:
            category, caution = "company_mention_review", "회사 언급을 본문 전체에서 확인했으나 현재 능력이나 모든 기사 내용의 수행 주체로 확대하지 않음"
        else:
            category, caution = "industry_or_unattributed_record", "회사 수행 주체가 명확하지 않은 업계 소식 및 원문 자료 회사 실적으로 전용하지 않음"
        if number in REVIEW:
            category, caution = REVIEW[number]
        ledger.append({
            "id": record["id"], "sourceUrl": record["sourceUrl"], "kind": record["kind"], "title": title,
            "postedDate": date, "bodyDateStrings": dates, "bodyYearStrings": years,
            "bodyCharacters": len(body), "bodySha256": hashlib.sha256(body.encode()).hexdigest(),
            "sourceTextSha256": record["sourceTextSha256"], "companyMentionDetected": explicit_company,
            "reviewCategory": category, "reuseCaution": caution,
            "reviewMethod": "full_text_scan_and_focused_body_reading" if number in REVIEW else "full_text_scan_and_title_review",
            "externalLinks": record.get("externalLinks", []),
        })
    report = {
        "scope": "384 preserved Korean news records; entire body text scanned for subjects, dates and company mentions; company facts and ambiguities reviewed in their original bodies; no claim of visiting every external press link",
        "source": "dist/source-archive.json (immutable source capture retained separately)",
        "sourceLanguages": {"ko": len(news), "en": 0},
        "recordCounts": dict(collections.Counter(row["kind"] for row in ledger)),
        "postedYearCounts": dict(sorted(collections.Counter(row["postedDate"][:4] or "none" for row in ledger).items())),
        "reviewCategoryCounts": dict(collections.Counter(row["reviewCategory"] for row in ledger)),
        "records": ledger,
    }
    (OUT / "news-content-audit-20260928.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({key: value for key, value in report.items() if key != "records"}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
