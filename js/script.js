// --- script.js --- (최종 수정본)

// --- 파일 상단 또는 적절한 위치에 추가 ---
const sectionToFileMap = {
    // 기본 설정
    'company-mgmt': 'settings.html',
    'user-mgmt': 'settings.html',
    'partner-mgmt': 'settings.html',
    'item-mgmt': 'settings.html',
    // 영업 관리
    'customer-mgmt': 'sales-management.html',
    'quote-mgmt': 'sales-management.html',
    'order-mgmt': 'sales-management.html',
    // 구매 관리
    'supplier-mgmt': 'purchase-management.html',
    'purchase-request-mgmt': 'purchase-management.html',
    'purchase-order-mgmt': 'purchase-management.html',
    // 재고 관리
    'item-list': 'inventory-management.html',
    'inventory-receipt': 'inventory-management.html',
    'inventory-issue': 'inventory-management.html',
    'inventory-status': 'inventory-management.html',
    // 생산 관리
    'bom-mgmt': 'production-management.html',
    'workorder-mgmt': 'production-management.html',
    'production-result': 'production-management.html',
    'equipment-mgmt': 'production-management.html',
    // 품질 관리
    'inspection-standard': 'quality-management.html',
    'incoming-inspection': 'quality-management.html',
    'inprocess-inspection': 'quality-management.html',
    'outgoing-inspection': 'quality-management.html',
    'inspection-equip-mgmt': 'quality-management.html',
    'nonconformity-mgmt': 'quality-management.html',
    // 안전 관리
    'risk-assessment': 'safety-management.html',
    'safety-equipment': 'safety-management.html',
    // 경영 관리
    'policy': 'business-management.html',
    'objectives': 'business-management.html',
    'org-chart': 'business-management.html',
    'risk-mgmt': 'business-management.html',
    'training': 'business-management.html',
    'qualification': 'business-management.html',
    'partner-eval': 'business-management.html',
    'proposal': 'business-management.html',
    'internal-audit': 'business-management.html',
    'mgmt-review': 'business-management.html',
    // 문서 관리
    'manuals': 'document-management.html',
    'procedures': 'document-management.html',
    'forms': 'document-management.html',
    // 기록 관리
    'records': 'record-management.html',
    // 대시보드
    'dashboard-overview': 'dashboard.html'
};

// --- 전역 변수 선언 ---
let isLoggedIn = false;
let items = [ { id: 1, itemType: 'Product', itemCode: 'P00001', itemName: '센서용 메인보드 PCB', itemSpec: 'PCB-A1-Rev1.2', itemUnit: 'EA', sellingPrice: 12000, purchasePrice: null, supplierName: null, supplierId: null, registrationDate: '2023-11-01', notes: '4-Layer, Rev 1.2', imageUrl: null }, { id: 2, itemType: 'Product', itemCode: 'P00002', itemName: '스마트 센서 모듈', itemSpec: 'Sensor-A1', itemUnit: 'EA', sellingPrice: 55000, purchasePrice: null, supplierName: null, supplierId: null, registrationDate: '2024-01-15', notes: '온도/습도 감지, Wifi 통신', imageUrl: null }, { id: 3, itemType: 'Product', itemCode: 'P00003', itemName: '센서 모듈 케이스', itemSpec: 'Case-A', itemUnit: 'EA', sellingPrice: 3000, purchasePrice: null, supplierName: null, supplierId: null, registrationDate: '2023-12-20', notes: 'ABS, 백색, 방수 처리', imageUrl: null }, { id: 101, itemType: 'RawMaterial', itemCode: 'M-STL-001', itemName: '스테인리스 강판', itemSpec: 'SUS304-HL 1.0T', itemUnit: 'EA', sellingPrice: null, purchasePrice: 150000, supplierName: '(주)강철상사', supplierId: 2, registrationDate: '2023-05-10', notes: '1219*2438', imageUrl: null }, { id: 102, itemType: 'RawMaterial', itemCode: 'M-IPA-001', itemName: '이소프로필 알코올 (IPA)', itemSpec: 'Grade A, 99.9%', itemUnit: 'L', sellingPrice: null, purchasePrice: 25000, supplierName: '화학나라', supplierId: 4, registrationDate: '2022-11-20', notes: '5L 용기', imageUrl: null }, { id: 103, itemType: 'RawMaterial', itemCode: 'M-ABS-001', itemName: 'ABS 펠릿 (백색)', itemSpec: 'HF-380, Grade 2', itemUnit: 'kg', sellingPrice: null, purchasePrice: 3500, supplierName: 'ABC 플라스틱', supplierId: 5, registrationDate: '2022-09-01', notes: '', imageUrl: null }, { id: 201, itemType: 'Equipment', itemCode: 'CNC-001', itemName: 'CNC 선반 A', itemSpec: 'MODEL-X1', itemUnit: '대', sellingPrice: null, purchasePrice: 150000000, supplierName: '한국기계', supplierId: null, registrationDate: '2024-03-10', notes: '전기사용량: 15.5kW\n책임부서: 생산팀', imageUrl: null, responsibleDepartment: '생산팀', lastMaintenanceDate: '2024-12-01' }, { id: 202, itemType: 'Equipment', itemCode: 'PACK-005', itemName: '자동 포장기', itemSpec: 'PACK-AUTO-03', itemUnit: '대', sellingPrice: null, purchasePrice: 45000000, supplierName: '월드패키징', supplierId: null, registrationDate: '2023-11-20', notes: '전기사용량: 3.2kW\n책임부서: 출하팀', imageUrl: null, responsibleDepartment: '출하팀', lastMaintenanceDate: '2025-02-15' }, { id: 301, itemType: 'InspectionEquipment', itemCode: 'INS-CAL-001', itemName: '디지털 캘리퍼스', itemSpec: 'Mitutoyo 500-196-30', itemUnit: '개', sellingPrice: null, purchasePrice: 180000, supplierName: 'Mitutoyo', supplierId: null, registrationDate: '2020-01-10', notes: '교정주기:12개월', imageUrl: null, manufacturer: 'Mitutoyo', calibrationCycle: '12개월', lastCalibrationDate: '2024-11-15', calibrationStatus: 'Normal', responsibleDepartment: '품질팀' }, { id: 302, itemType: 'InspectionEquipment', itemCode: 'INS-MIC-003', itemName: '마이크로미터', itemSpec: '0-25mm', itemUnit: '개', sellingPrice: null, purchasePrice: 95000, supplierName: 'NSK', supplierId: null, registrationDate: '2019-07-25', notes: '교정주기:12개월', imageUrl: null, manufacturer: 'NSK', calibrationCycle: '12개월', lastCalibrationDate: '2024-05-20', calibrationStatus: 'Scheduled', responsibleDepartment: '품질팀' }, { id: 303, itemType: 'InspectionEquipment', itemCode: 'INS-LEN-015', itemName: '강철자', itemSpec: '300mm', itemUnit: '개', sellingPrice: null, purchasePrice: 15000, supplierName: 'Shinwa', supplierId: null, registrationDate: '2018-10-01', notes: '교정 제외', imageUrl: null, manufacturer: 'Shinwa', calibrationCycle: '교정 제외', lastCalibrationDate: '', calibrationStatus: 'Excluded', responsibleDepartment: '생산팀' } ];
let users = [ { id: 1, userId: 'admin', userName: '관리자', department: '관리부', userRole: 'Admin', userStatus: 'Active', registrationDate: '2023-01-01', lastLogin: '2025-04-23' }, { id: 2, userId: 'user1', userName: '김생산', department: '생산팀', userRole: 'RecordCreator', userStatus: 'Active', registrationDate: '2023-05-10', lastLogin: '2025-04-22' }, { id: 3, userId: 'user2', userName: '박품질', department: '품질팀', userRole: 'Reviewer', userStatus: 'Active', registrationDate: '2023-06-15', lastLogin: '2025-04-24' } ];
let partners = [ { id: 2, partnerType: 'Supplier', partnerName: '(주)강철상사', businessRegNumber: '120-81-12345', mainItems: '특수강', contactPerson: '김철수 부장', phoneNumber: '02-1111-2222', email: 'cs.kim@kangchul.co.kr', registrationDate: '2022-08-01', address: '서울시 강남구', faxNumber: '02-1111-2223', notes: '월말 정산', defectCount: 3 }, { id: 1, partnerType: 'Customer', partnerName: '미래전자', businessRegNumber: '211-85-67890', mainItems: '전자 부품', contactPerson: '박영희 대리', phoneNumber: '031-3333-4444', email: 'yh.park@mirae-elec.com', registrationDate: '2021-03-15', address: '경기도 수원시', faxNumber: '', notes: '' }, { id: 3, partnerType: 'Subcontractor', partnerName: '정밀도금기술', businessRegNumber: '310-82-98765', mainItems: '표면 처리 (도금)', contactPerson: '이정밀 사장', phoneNumber: '064-5555-6666', email: 'master@jmtogeum.kr', registrationDate: '2023-01-10', address: '제주시 애월읍', faxNumber: '', notes: '급건 처리 가능' }, { id: 4, partnerType: 'Supplier', partnerName: '화학나라', businessRegNumber: '111-22-33333', mainItems: '화공약품', contactPerson: '최화학 팀장', phoneNumber: '031-222-3333', email: 'chem@chemworld.com', registrationDate: '2022-11-20', address: '경기도 안산시', faxNumber: '', notes: 'MSDS 필수 첨부', defectCount: 1 }, { id: 5, partnerType: 'Supplier', partnerName: 'ABC 플라스틱', businessRegNumber: '444-55-66666', mainItems: 'ABS 펠릿', contactPerson: '', phoneNumber: '032-777-8888', email: '', registrationDate: '2022-09-01', address: '인천광역시 남동구', faxNumber: '', notes: '', defectCount: 0 } ];
let customers = [ { id: 1, customerName: '미래전자', businessRegNumber: '211-85-67890', ceoName: '김미래', phoneNumber: '031-3333-4444', representativeUserId: 2, status: 'Active', registrationDate: '2021-03-15', address: '경기도 수원시', notes: '' }, { id: 2, customerName: '(주)성공시스템', businessRegNumber: '123-88-00001', ceoName: '이성공', phoneNumber: '02-9876-5432', representativeUserId: 1, status: 'Active', registrationDate: '2022-07-20', address: '서울시 구로구', notes: '월말 결제' }, { id: 3, customerName: '잠재고객사 알파', businessRegNumber: '', ceoName: '', phoneNumber: '010-1234-0001', representativeUserId: 2, status: 'Potential', registrationDate: '2024-03-01', address: '', notes: '견적 요청 상태' } ];
let bomData = { 2: [ { childItemId: 1, childItemCode: 'P00001', childItemName: '센서용 메인보드 PCB', itemSpec: 'PCB-A1-Rev1.2', itemType: 'Product', childItemUnit: 'EA', quantity: 1, remarks: '주요 부품' }, { childItemId: 3, childItemCode: 'P00003', childItemName: '센서 모듈 케이스', itemSpec: 'Case-A', itemType: 'Product', childItemUnit: 'EA', quantity: 1, remarks: '외장 케이스' }, { childItemId: 103, childItemCode: 'M-ABS-001', childItemName: 'ABS 펠릿 (백색)', itemSpec: 'HF-380, Grade 2', itemType: 'RawMaterial', childItemUnit: 'kg', quantity: 0.05, remarks: '케이스 사출용' } ], 1: [ { childItemId: 101, childItemCode: 'M-STL-001', childItemName: '스테인리스 강판', itemSpec: 'SUS304-HL 1.0T', itemType: 'RawMaterial', childItemUnit: 'EA', quantity: 0.1, remarks: '' }, { childItemId: 102, childItemCode: 'M-IPA-001', childItemName: '이소프로필 알코올 (IPA)', itemSpec: 'Grade A, 99.9%', itemType: 'RawMaterial', childItemUnit: 'L', quantity: 0.01, remarks: '세척용' } ] };
let companyData = { companyName: "내 회사", businessRegistrationNumber: "000-00-00000", address: "등록된 주소 없음", ceoName: "미등록", mainProducts: "[정보 없음]", phoneNumber: "00-0000-0000", faxNumber: "[정보 없음]", sealImageUrl: null };
const sampleQuotes = [ { id: 'q-001', quoteNumber: 'QT20250424-001', customerName: '(주)행복상사', quoteDate: '2025-04-24', expiryDate: '2025-05-24', totalAmount: 580000, status: 'Sent', statusText: '전송됨', authorName: '김영업', notes: '첫 번째 샘플 견적의 비고란입니다.\n납기일을 꼭 지켜주세요.', items: [ { itemId: 2, quantity: 10, unitPrice: 55000 }, { itemId: 3, quantity: 10, unitPrice: 3000 } ] }, { id: 'q-002', quoteNumber: 'QT20250423-005', customerName: '테스트 컴퍼니', quoteDate: '2025-04-23', expiryDate: '2025-05-23', totalAmount: 115000, status: 'Draft', statusText: '작성중', authorName: '박지원', notes: '', items: [ { itemId: 1, quantity: 5, unitPrice: 12000 }, { itemId: 2, quantity: 1, unitPrice: 55000 } ] } ];
let sampleOrders = [];
let nextOrderIdCounter = sampleOrders.length + 1;
let nextItemId = Math.max(0, ...items.map(i => i.id)) + 1;
let nextUserId = Math.max(0, ...users.map(u => u.id)) + 1;
let nextPartnerId = Math.max(0, ...partners.map(p => p.id)) + 1;
let nextCustomerId = Math.max(0, ...customers.map(c => c.id)) + 1;
let bomNextRowIndex = 1;
let targetBomRowForSearch = null;
let quoteNextRowIndex = 1;
let currentlyLoadedFile = null;
let lastFetchedContent = {};

// --- 함수 정의들 ---

// Basic Navigation & Modal Logic 관련 함수
function updateHeader() {
    const headerLoggedIn = document.getElementById('header-logged-in');
    const headerLoggedOut = document.getElementById('header-logged-out');
    if (!headerLoggedIn || !headerLoggedOut) return;

    if (isLoggedIn) {
        headerLoggedIn.style.display = 'flex';
        headerLoggedOut.style.display = 'none';
    } else {
        headerLoggedIn.style.display = 'none';
        headerLoggedOut.style.display = 'flex';
    }
}

function openModal(modalId, dataToEdit = null) {
    const modal = document.getElementById(modalId);
    if (modal) {
        const form = modal.querySelector('form');
        if (form) {
            form.reset(); // 폼 초기화 먼저 수행
        }

        // z-index 처리
        if (modalId === 'bom-child-item-search-modal') {
            modal.style.zIndex = 1001;
        } else {
            modal.style.zIndex = '';
        }

        // --- Edit Mode Population Logic ---
        if (dataToEdit) {
            console.log(`Opening modal ${modalId} in EDIT mode with data:`, dataToEdit);

            // 사용자 수정
            if (modalId === 'add-user-modal') {
                document.getElementById('add-user-modal').querySelector('h2').textContent = '인원 정보 수정';
                document.getElementById('edit-user-id').value = dataToEdit.id;
                document.getElementById('add-user-name').value = dataToEdit.userName;
                document.getElementById('add-user-id').value = dataToEdit.userId;
                document.getElementById('add-user-id').readOnly = true;
                document.getElementById('add-user-password').required = false;
                document.getElementById('add-user-confirm-password').required = false;
                document.getElementById('add-user-dept').value = dataToEdit.department;
                document.getElementById('add-user-role').value = dataToEdit.userRole;
                document.getElementById('add-user-status').value = dataToEdit.userStatus;
                document.getElementById('add-user-password').value = '';
                document.getElementById('add-user-confirm-password').value = '';
                document.getElementById('add-user-password').placeholder = '변경할 경우에만 입력';
                document.getElementById('add-user-confirm-password').placeholder = '변경할 경우에만 입력';
            }
            // 기업 정보 수정
            else if (modalId === 'edit-company-modal') {
                console.log(`Opening modal ${modalId} for editing company info`);
                populateEditCompanyForm(); // populateEditCompanyForm 함수 호출
            }
            // 품목 수정
            else if (modalId === 'add-item-modal') {
                document.getElementById('item-modal-title').textContent = '품목 정보 수정';
                document.getElementById('edit-item-id').value = dataToEdit.id;
                document.getElementById('add-item-type').value = dataToEdit.itemType;
                handleItemTypeChange(); // 타입에 따라 필드 표시 변경
                document.getElementById('add-item-code').value = dataToEdit.itemCode;
                document.getElementById('add-item-name').value = dataToEdit.itemName;
                document.getElementById('add-item-spec').value = dataToEdit.itemSpec || '';
                document.getElementById('add-item-unit').value = dataToEdit.itemUnit;
                document.getElementById('add-item-notes').value = dataToEdit.notes || '';
                document.getElementById('add-item-reg-date').value = dataToEdit.registrationDate || '';
                document.getElementById('add-item-reg-date').readOnly = true;

                // 타입별 필드 채우기 (품목 모달 내부의 ID 사용)
                if (dataToEdit.itemType === 'RawMaterial') {
                    document.getElementById('add-item-purchase-price').value = dataToEdit.purchasePrice || '';
                    document.getElementById('add-item-supplier').value = dataToEdit.supplierName || ''; // 주 공급처 이름
                    document.getElementById('add-item-supplier-id').value = dataToEdit.supplierId || ''; // 주 공급처 ID (hidden)
                } else if (dataToEdit.itemType === 'Product') {
                    document.getElementById('add-item-selling-price').value = dataToEdit.sellingPrice || '';
                } else if (dataToEdit.itemType === 'Equipment') { // 설비 타입 필드 채우기
                     document.getElementById('add-equip-supplier-form').value = dataToEdit.supplierName || ''; // 구입처 (품목 모달 내 설비 필드 사용)
                     // document.getElementById('add-equip-power-form').value = dataToEdit.powerConsumption || ''; // 전력 (품목 데이터 구조 확인 필요)
                     document.getElementById('add-equip-resp-dept-form').value = dataToEdit.responsibleDepartment || ''; // 책임 부서 (품목 모달 내 설비 필드 사용)
                } else if (dataToEdit.itemType === 'InspectionEquipment') { // 검사장비 타입 필드 채우기
                    document.getElementById('add-insp-equip-manufacturer-form').value = dataToEdit.manufacturer || '';
                    document.getElementById('add-insp-equip-cycle-form').value = dataToEdit.calibrationCycle || '';
                    document.getElementById('add-insp-equip-last-cal-form').value = dataToEdit.lastCalibrationDate || '';
                    document.getElementById('add-insp-equip-status-form').value = dataToEdit.calibrationStatus || '';
                    document.getElementById('add-insp-equip-resp-dept-form').value = dataToEdit.responsibleDepartment || ''; // 책임 부서
                }
                // TODO: 이미지 미리보기 로직 추가 (필요시)
            }
            // 거래처 수정
            else if (modalId === 'add-partner-modal') {
                document.getElementById('add-partner-modal').querySelector('h2').textContent = '거래처 정보 수정';
                document.getElementById('edit-partner-id').value = dataToEdit.id; // hidden input
                document.getElementById('add-partner-name').value = dataToEdit.partnerName;
                document.getElementById('add-partner-type').value = dataToEdit.partnerType;
                document.getElementById('add-partner-biz-num').value = dataToEdit.businessRegNumber || '';
                document.getElementById('add-partner-items').value = dataToEdit.mainItems || '';
                document.getElementById('add-partner-address').value = dataToEdit.address || '';
                document.getElementById('add-partner-contact-person').value = dataToEdit.contactPerson || '';
                document.getElementById('add-partner-tel').value = dataToEdit.phoneNumber || '';
                document.getElementById('add-partner-email').value = dataToEdit.email || '';
                document.getElementById('add-partner-fax').value = dataToEdit.faxNumber || '';
                document.getElementById('add-partner-notes').value = dataToEdit.notes || '';
                document.getElementById('add-partner-reg-date').value = dataToEdit.registrationDate || '';
                document.getElementById('add-partner-reg-date').readOnly = true;
            }
            // 고객 수정
            else if (modalId === 'add-customer-modal') {
                document.getElementById('add-customer-modal').querySelector('h2').textContent = '고객 정보 수정';
                document.getElementById('edit-customer-id').value = dataToEdit.id; // hidden input
                document.getElementById('add-cust-name').value = dataToEdit.customerName;
                document.getElementById('add-cust-biz-num').value = dataToEdit.businessRegNumber || '';
                document.getElementById('add-cust-ceo').value = dataToEdit.ceoName || '';
                document.getElementById('add-cust-tel').value = dataToEdit.phoneNumber || '';
                document.getElementById('add-cust-address').value = dataToEdit.address || '';
                document.getElementById('add-cust-rep-id').value = dataToEdit.representativeUserId || ''; // 담당자 ID
                document.getElementById('add-cust-status').value = dataToEdit.status;
                document.getElementById('add-cust-reg-date').value = dataToEdit.registrationDate || '';
                document.getElementById('add-cust-reg-date').readOnly = true; // 등록일 수정 불가
                document.getElementById('add-cust-notes').value = dataToEdit.notes || '';
            }
            // *** ▼▼▼ 설비 수정 처리 블록 (여기 추가!) ▼▼▼ ***
            else if (modalId === 'add-equipment-modal') {
                document.getElementById('add-equipment-modal').querySelector('h2').textContent = '설비 정보 수정';
                document.getElementById('edit-equipment-id').value = dataToEdit.id; // Hidden input에 ID 저장

                // 폼 필드 ID 확인 및 데이터 채우기 (index.html의 add-equipment-modal 내부 ID 사용)
                document.getElementById('add-equip-name').value = dataToEdit.itemName || '';
                document.getElementById('add-equip-model').value = dataToEdit.itemSpec || ''; // 모델명
                document.getElementById('add-equip-number').value = dataToEdit.itemCode || ''; // 설비번호
                document.getElementById('add-equip-supplier').value = dataToEdit.supplierName || ''; // 구입처
                document.getElementById('add-equip-reg-date').value = dataToEdit.registrationDate || '';
                document.getElementById('add-equip-reg-date').readOnly = true; // 등록일은 수정 불가
                document.getElementById('add-equip-notes').value = dataToEdit.notes || ''; // 비고

                // 전력소모량, 책임부서 필드가 폼에 있다면 해당 값도 채워넣어야 함
                const powerInput = document.getElementById('add-equip-power'); // 폼 안의 전력량 input ID
                if(powerInput) {
                     // items 데이터 구조에 powerConsumption 필드가 별도로 있는지 확인 필요
                     // 예: powerInput.value = dataToEdit.powerConsumption || '';
                     // 또는 notes에서 파싱한 값:
                     const powerMatch = dataToEdit.notes?.match(/전기사용량:\s*([\d.]+)\s*kW/i);
                     powerInput.value = powerMatch ? powerMatch[1] : '';
                }

                const respDeptInput = document.getElementById('add-equip-resp-dept'); // 폼 안의 책임부서 input ID (없으면 추가 필요)
                if(respDeptInput) respDeptInput.value = dataToEdit.responsibleDepartment || '';

                // TODO: 이미지 미리보기 로직 추가 (필요시)
            }
            // *** ▲▲▲ 설비 수정 처리 블록 끝 ▲▲▲ ***

            // --- (기타 다른 모달 수정 처리 else if 블록들...) ---

        }
        // --- Add Mode (dataToEdit가 없을 때) ---
        else {
            console.log(`Opening modal ${modalId} in ADD mode`);
            // 각 모달별 '추가' 모드 초기화 로직 (필요시 추가)
            if (modalId === 'add-user-modal') {
                document.getElementById('add-user-modal').querySelector('h2').textContent = '신규 인원 추가';
                document.getElementById('edit-user-id').value = '';
                document.getElementById('add-user-id').readOnly = false;
                document.getElementById('add-user-password').required = true;
                document.getElementById('add-user-confirm-password').required = true;
                document.getElementById('add-user-password').placeholder = '';
                document.getElementById('add-user-confirm-password').placeholder = '';
            } else if (modalId === 'add-item-modal') {
                document.getElementById('item-modal-title').textContent = '신규 품목 추가';
                document.getElementById('edit-item-id').value = '';
                document.getElementById('add-item-reg-date').readOnly = false;
                document.getElementById('add-item-reg-date').value = new Date().toISOString().split('T')[0];
                handleItemTypeChange(); // 타입 필드 초기 상태 반영
            } else if (modalId === 'add-quote-modal') {
                // ... (견적 추가 초기화) ...
            } else if (modalId === 'add-order-modal') {
                // ... (주문 추가 초기화) ...
            } else if (modalId === 'add-partner-modal') {
                document.getElementById('add-partner-modal').querySelector('h2').textContent = '신규 거래처 추가';
                document.getElementById('edit-partner-id').value = '';
                document.getElementById('add-partner-reg-date').readOnly = false;
                document.getElementById('add-partner-reg-date').value = new Date().toISOString().split('T')[0];
            } else if (modalId === 'add-customer-modal') {
                 document.getElementById('add-customer-modal').querySelector('h2').textContent = '신규 고객 추가';
                 document.getElementById('edit-customer-id').value = '';
                 document.getElementById('add-cust-reg-date').readOnly = false;
                 document.getElementById('add-cust-reg-date').value = new Date().toISOString().split('T')[0];
                 // populateRepresentativeDropdown('add-cust-rep-id'); // 담당자 드롭다운 채우기
            }
            // *** ▼▼▼ 설비 추가 처리 블록 (여기 추가!) ▼▼▼ ***
            else if (modalId === 'add-equipment-modal') {
                document.getElementById('add-equipment-modal').querySelector('h2').textContent = '신규 설비 추가';
                document.getElementById('edit-equipment-id').value = ''; // Hidden input 초기화
                document.getElementById('add-equip-reg-date').readOnly = false;
                document.getElementById('add-equip-reg-date').value = new Date().toISOString().split('T')[0];
                // 폼의 다른 필드들은 form.reset()으로 초기화됨
            }
             // *** ▲▲▲ 설비 추가 처리 블록 끝 ▲▲▲ ***

            // --- (기타 다른 모달 추가 처리 else if 블록들...) ---
        }

        // 모달 표시
        modal.style.display = 'block';
        console.log(`Opened modal: ${modalId}`);

    } else {
        console.error(`Modal with ID "${modalId}" not found!`);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        modal.style.zIndex = ''; // z-index 초기화
        console.log(`Closed modal: ${modalId}`);
    }
}

function handleItemTypeChange() {
    const selectedTypeElement = document.getElementById('add-item-type');
    if (!selectedTypeElement) return;
    const selectedType = selectedTypeElement.value;

    const fields = ['raw-material-fields', 'product-fields', 'semifinished-fields', 'equipment-fields', 'inspection-equipment-fields'];
    fields.forEach(fieldId => {
        const element = document.getElementById(fieldId);
        if (element) element.style.display = 'none';
    });

    let targetFieldId = null;
    if (selectedType === 'RawMaterial') targetFieldId = 'raw-material-fields';
    else if (selectedType === 'Product') targetFieldId = 'product-fields';
    else if (selectedType === 'SemiFinished') targetFieldId = 'semifinished-fields';
    else if (selectedType === 'Equipment') targetFieldId = 'equipment-fields';
    else if (selectedType === 'InspectionEquipment') targetFieldId = 'inspection-equipment-fields';

    if (targetFieldId) {
        const element = document.getElementById(targetFieldId);
        if (element) element.style.display = 'block';
    }
}


// --- 데이터 렌더링 함수들 ---
function renderUserList(userList) {
    const tableBody = document.getElementById('user-table-body');
    if (!tableBody) { console.error("User table body not found!"); return; }
    tableBody.innerHTML = '';
    if (!userList || userList.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="9" style="text-align: center;">데이터가 없습니다.</td></tr>';
        return;
    }
    userList.forEach((user, index) => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = index + 1;
        row.insertCell().textContent = user.userName; // 성명 먼저
        row.insertCell().textContent = user.userId;
        row.insertCell().textContent = user.department;
        row.insertCell().textContent = user.userRole;
        row.insertCell().textContent = user.userStatus;
        row.insertCell().textContent = user.registrationDate;
        row.insertCell().textContent = user.lastLogin || '-';
        const actionsCell = row.insertCell();
        actionsCell.innerHTML = `
            <button class="view-button" onclick="viewUserDetails(${user.id})">보기</button>
            <button class="edit-button" onclick="openModal('add-user-modal', users.find(u => u.id === ${user.id}))">수정</button>
            <button class="delete-button" onclick="deleteUser(${user.id})">삭제</button>
        `;
    });
    console.log("User list rendered.");
}

function renderPartnerList(partnerList, tableBodyId = 'partner-table-body', paginationId = null) {
    const tableBody = document.getElementById(tableBodyId);
    if (!tableBody) { console.error(`Partner table body #${tableBodyId} not found!`); return; }
    tableBody.innerHTML = '';
     if (!partnerList || partnerList.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="10" style="text-align: center;">데이터가 없습니다.</td></tr>`; // Colspan 확인
        return;
    }
    partnerList.forEach((partner, index) => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = index + 1;
        row.insertCell().textContent = partner.partnerType; // TODO: 한글로 변환?
        row.insertCell().textContent = partner.partnerName;
        row.insertCell().textContent = partner.businessRegNumber || '-';
        row.insertCell().textContent = partner.mainItems || '-';
        row.insertCell().textContent = partner.contactPerson || '-';
        row.insertCell().textContent = partner.phoneNumber || '-';
        row.insertCell().textContent = partner.email || '-';
        row.insertCell().textContent = partner.registrationDate || '-';
        const actionsCell = row.insertCell();
         actionsCell.innerHTML = `
            <button class="view-button" onclick="viewPartnerDetails(${partner.id})">상세</button>
            <button class="edit-button" onclick="console.log('Edit partner clicked for ID:', ${partner.id}); openModal('add-partner-modal', partners.find(p => p.id === ${partner.id}))">수정</button>
            <button class="delete-button" onclick="deletePartner(${partner.id})">삭제</button>
        `;
    });
     console.log(`Partner list rendered into #${tableBodyId}.`);
     // TODO: Implement pagination logic using paginationId if provided
}

function renderItemList(itemList) {
     const tableBody = document.getElementById('item-table-body');
    if (!tableBody) { console.error("Item table body not found!"); return; }
    tableBody.innerHTML = '';
     if (!itemList || itemList.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" style="text-align: center;">데이터가 없습니다.</td></tr>'; // Colspan 확인
        return;
    }
    itemList.forEach((item, index) => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = index + 1; // No
        const imgCell = row.insertCell(); // 이미지 셀
        console.log(`Item ${index + 1} - Image URL:`, item.imageUrl);
        console.log(`Item ${index + 1} - Item Name:`, item.itemName);
        imgCell.innerHTML = `<img src="${item.imageUrl || 'images/placeholder_item.png'}" alt="${item.itemName}" style="width: 40px; height: 40px; object-fit: contain;">`;
        row.insertCell().textContent = item.itemType; // TODO: 한글 변환?
        row.insertCell().textContent = item.itemCode;
        row.insertCell().textContent = item.itemName;
        row.insertCell().textContent = item.itemSpec || '-';
        row.insertCell().textContent = item.itemUnit;
        const actionsCell = row.insertCell();
        actionsCell.innerHTML = `
        <button class="view-button" onclick="viewItemDetails(${item.id})">상세</button>
        ${item.itemType === 'Product' || item.itemType === 'SemiFinished' ? `<button class="write-button" onclick="registerBom(${item.id})">BOM</button>` : ''}
        <button class="edit-button" onclick="openModal('add-item-modal', items.find(i => i.id === ${item.id}))">수정</button>
        <button class="delete-button" onclick="deleteItem(${item.id})">삭제</button>
    `;
    });
     console.log("Item list rendered.");
}

function renderCustomerList(customerList) {
     const tableBody = document.getElementById('customer-table-body');
    if (!tableBody) { console.error("Customer table body not found!"); return; }
    tableBody.innerHTML = '';
      if (!customerList || customerList.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="9" style="text-align: center;">데이터가 없습니다.</td></tr>'; // Colspan 확인
        return;
    }
    customerList.forEach((customer, index) => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = index + 1;
        row.insertCell().textContent = customer.customerName;
        row.insertCell().textContent = customer.businessRegNumber || '-';
        row.insertCell().textContent = customer.ceoName || '-';
        row.insertCell().textContent = customer.phoneNumber || '-';
        const repUser = users.find(u => u.id === customer.representativeUserId); // 담당자 이름 찾기
        row.insertCell().textContent = repUser ? repUser.userName : '-';
        row.insertCell().textContent = customer.status; // TODO: 한글 변환?
        row.insertCell().textContent = customer.registrationDate || '-';
        const actionsCell = row.insertCell();
         actionsCell.innerHTML = `
            <button class="view-button" onclick="viewCustomerDetails(${customer.id})">보기</button>
            <button class="edit-button" onclick="openModal('add-customer-modal', customers.find(c => c.id === <span class="math-inline">\{customer\.id\}\)\)"\>수정</button\>
<button class\="delete\-button" onclick\="deleteCustomer\(</span>{customer.id})">삭제</button>
        `;
    });
     console.log("Customer list rendered.");
}

function displayQuotes(quotes) { /* ... 함수 내용 ... */ } // 이전 제공 코드 사용
function displayOrders(orders) { /* ... 함수 내용 ... */ } // 이전 제공 코드 사용
function renderEquipmentList(equipmentList) {
    // alert('설비 목록 표시 기능 구현 필요'); // 기존 alert 제거
    console.log("Rendering equipment list...");

    const tableBody = document.getElementById('equipment-table-body');
    if (!tableBody) {
        console.error("Equipment table body (#equipment-table-body) not found!");
        // 오류 발생 시 사용자에게 알릴 방법을 고려할 수 있습니다.
        // 예: main-content 영역에 오류 메시지 표시
        const mainContentArea = document.querySelector('.main-content');
        if (mainContentArea) {
             mainContentArea.innerHTML = `<p style='color:red;'>오류: 설비 목록을 표시할 테이블 영역을 찾을 수 없습니다.</p>`;
        }
        return;
    }

    tableBody.innerHTML = ''; // 기존 테이블 내용 비우기

    if (!equipmentList || equipmentList.length === 0) {
        // 테이블 헤더 컬럼 수에 맞춰서 colspan 설정 (예: 8개 컬럼)
        tableBody.innerHTML = '<tr><td colspan="8" style="text-align: center;">등록된 설비 정보가 없습니다.</td></tr>';
        console.log("No equipment data to display.");
        return;
    }

    equipmentList.forEach((equip, index) => {
        const row = tableBody.insertRow();

        row.insertCell().textContent = index + 1; // No

        // 이미지 셀
        const imgCell = row.insertCell();
        const imgSrc = equip.imageUrl || 'images/placeholder_item.png'; // 설비 이미지 없을 경우 기본 이미지
        imgCell.innerHTML = `<img src="${imgSrc}" alt="${equip.itemName}" style="width: 50px; height: 50px; object-fit: contain; vertical-align: middle;">`;

        row.insertCell().textContent = equip.itemCode || '-';       // 설비번호
        row.insertCell().textContent = equip.itemName || '-';       // 설비명
        row.insertCell().textContent = equip.itemSpec || '-';        // 모델명
        row.insertCell().textContent = equip.responsibleDepartment || '-'; // 책임부서 (items 데이터 구조 확인 필요)
        row.insertCell().textContent = equip.registrationDate || '-'; // 등록일

        // 관리 버튼 셀
        const actionsCell = row.insertCell();
        actionsCell.style.whiteSpace = 'nowrap'; // 버튼 줄바꿈 방지
        actionsCell.innerHTML = `
            <button class="view-button" onclick="viewEquipmentDetails(${equip.id})">보기</button>
            <button class="edit-button" onclick="openModal('add-equipment-modal', items.find(i => i.id === ${equip.id}))">수정</button>
            <button class="delete-button" onclick="deleteEquipment(${equip.id})">삭제</button>
        `;
        // 참고: add-equipment-modal 핸들링, viewEquipmentDetails, deleteEquipment 함수는 별도 구현 필요
    });

    console.log(`Successfully rendered ${equipmentList.length} equipment items.`);
}

// --- Helper Functions (아직 구현 안 된 경우 추가) ---

/**
 * (Placeholder) 설비 상세 정보 보기 함수
 * @param {number} equipmentId - 상세 정보를 볼 설비의 ID
 */
function viewEquipmentDetails(equipmentId) {
    console.log(`Attempting to view details for equipment ID: ${equipmentId}`);
    const equipment = items.find(i => i.id === equipmentId && i.itemType === 'Equipment');

    if (equipment) {
        // 모달 내부 요소에 데이터 채우기 (ID 확인 및 필요시 HTML 수정)
        document.getElementById('view-equip-id').textContent = equipment.id;
        document.getElementById('view-equip-itemCode').textContent = equipment.itemCode || '-';
        document.getElementById('view-equip-itemName').textContent = equipment.itemName || '-';
        document.getElementById('view-equip-itemSpec').textContent = equipment.itemSpec || '-'; // 모델명
        document.getElementById('view-equip-itemUnit').textContent = equipment.itemUnit || '대'; // 단위 (기본값 '대')
        document.getElementById('view-equip-supplierName').textContent = equipment.supplierName || '-'; // 구입처
        document.getElementById('view-equip-registrationDate').textContent = equipment.registrationDate || '-';
        // 'Responsible Department' 와 'Power Consumption'은 items 데이터에 있지만,
        // view-equipment-details-modal HTML에는 해당 ID가 없을 수 있습니다.
        // 필요하다면 index.html의 모달 부분에 <dt>와 <dd id="...">를 추가해야 합니다.
        const respDeptElement = document.getElementById('view-equip-resp-dept'); // 예시 ID
        if(respDeptElement) respDeptElement.textContent = equipment.responsibleDepartment || '-';

        const powerElement = document.getElementById('view-equip-power'); // HTML ID 일치 확인 필요
        if(powerElement) {
             // items 데이터 구조에 powerConsumption 필드가 별도로 있는지 확인 필요
             // 없다면 notes 필드에서 파싱해야 할 수 있음
             // 예시: 비고 필드에서 "전기사용량: 15.5kW" 같은 텍스트 파싱
             const powerMatch = equipment.notes?.match(/전기사용량:\s*([\d.]+)\s*kW/i);
             powerElement.textContent = powerMatch ? `${powerMatch[1]} kW` : '-';
        }


        const notesElement = document.getElementById('view-equip-notes'); // HTML ID 일치 확인 필요
        if(notesElement) notesElement.textContent = equipment.notes || '-';

        const imageElement = document.getElementById('view-equip-image'); // HTML ID 일치 확인 필요
        if(imageElement) {
            imageElement.src = equipment.imageUrl || 'images/placeholder_item.png';
            imageElement.alt = equipment.itemName || '설비 이미지';
        }

        openModal('view-equipment-details-modal');
    } else {
        alert(`설비 정보(ID: ${equipmentId})를 찾을 수 없습니다.`);
    }
}

/**
 * (Placeholder) 설비 삭제 함수
 * @param {number} equipmentIdToDelete - 삭제할 설비의 ID
 */
function deleteEquipment(equipmentIdToDelete) {
    console.log(`Attempting to delete equipment ID: ${equipmentIdToDelete}`);
    if (confirm(`설비 ID ${equipmentIdToDelete}번 데이터를 정말 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`)) {
        // 전역 items 배열에서 삭제할 설비의 인덱스 찾기
        const itemIndex = items.findIndex(item => item.id === equipmentIdToDelete && item.itemType === 'Equipment');

        if (itemIndex > -1) {
            // 배열에서 설비 제거
            items.splice(itemIndex, 1);
            console.log(`Equipment with ID ${equipmentIdToDelete} removed from items array.`);

            // 설비 목록 테이블 다시 그리기 (변경된 items 배열 중 Equipment 타입만 필터링)
            renderEquipmentList(items.filter(i => i.itemType === 'Equipment'));
            alert('설비 정보가 삭제되었습니다.');

        } else {
            console.error(`Equipment with ID ${equipmentIdToDelete} not found for deletion.`);
            alert('오류: 삭제하려는 설비 정보를 찾을 수 없습니다.');
        }
    } else {
        console.log(`Equipment deletion cancelled for ID: ${equipmentIdToDelete}`);
    }
}

function renderInspectionEquipmentList(inspectionEquipList) { /* ... 검사장비 목록 렌더링 구현 ... */ alert('검사장비 목록 표시 기능 구현 필요');}

// --- 검색 함수들 ---
function searchUsers() { /* ... 함수 내용 ... */ } // 이전 제공 코드 사용
function searchPartners() { alert('거래처 검색 기능 구현 필요'); }
function searchItems() { alert('품목 검색 기능 구현 필요'); }
function searchCustomers() { alert('고객 검색 기능 구현 필요'); }
function searchQuotes() { alert('견적 검색 기능 구현 필요'); }
function searchOrders() { alert('주문 검색 기능 구현 필요'); }
function searchSuppliers() { alert('공급처 검색 기능 구현 필요'); }
function searchEquipment() { alert('설비 검색 기능 구현 필요'); }
function searchInspectionEquipment() { alert('검사장비 검색 기능 구현 필요'); }


// --- 정보 표시/수정 관련 함수들 ---
function displayCompanyInfo() {
    console.log("--- displayCompanyInfo started ---"); // 함수 시작 로그
    // 함수 시작 시점의 companyData 값 확인
    console.log("Current companyData:", JSON.parse(JSON.stringify(companyData)));

    const setText = (id, value) => {
        const element = document.getElementById(id);
        // ▼▼▼ 요소를 찾았는지, 어떤 값을 설정하는지 로그 추가 ▼▼▼
        console.log(`Finding element #${id}:`, element ? 'Found' : 'NOT FOUND!');
        if (element) {
            const textValue = (value === null || value === undefined || value === '') ? '[정보 없음]' : value;
            console.log(`---> Setting #${id} textContent to:`, textValue); // 설정 값 로그
            element.textContent = textValue;
        } else {
            console.warn(`Element with ID '${id}' not found.`); // 경고는 유지
        }
        // ▲▲▲ 로그 추가 끝 ▲▲▲
    };

    // 각 필드 업데이트
    setText('display-company-name', companyData.companyName);
    setText('display-biz-reg-num', companyData.businessRegistrationNumber);
    setText('display-address', companyData.address);
    setText('display-ceo', companyData.ceoName);
    setText('display-main-product', companyData.mainProducts);
    setText('display-tel', companyData.phoneNumber);
    setText('display-fax', companyData.faxNumber);

    // 이미지 처리 부분 로그 추가
    const sealImageElement = document.getElementById('display-seal-image');
    console.log("Finding element #display-seal-image:", sealImageElement ? 'Found' : 'NOT FOUND!');
    if (sealImageElement) {
        if (companyData.sealImageUrl) {
            console.log("Setting seal image src to:", companyData.sealImageUrl);
            sealImageElement.src = companyData.sealImageUrl;
            sealImageElement.alt = "회사 도장";
            sealImageElement.style.border = '1px solid #ccc';
            sealImageElement.style.display = 'inline-block';
        } else {
            console.log("Setting seal image to placeholder state.");
            sealImageElement.src = '#';
            sealImageElement.alt = "[도장 이미지 없음]";
            sealImageElement.style.border = '1px dashed #ccc';
            sealImageElement.style.display = 'inline-block';
        }
    } else {
         console.warn("Seal image display element ('display-seal-image') not found.");
    }

    console.log("--- displayCompanyInfo finished ---"); // 함수 종료 로그
}

function populateEditCompanyForm() { /* ... 함수 내용 ... */ } // 이전 제공 코드 사용

// --- (기타 view/edit/delete/add 함수들) ---
function viewUserDetails(id) { // '보기' 버튼 클릭 시 호출될 함수 (ID를 인자로 받음)
    console.log(`Attempting to view details for user ID: ${id}`);
  
    // 1. 전역 `users` 배열에서 해당 ID의 사용자 찾기
    const user = users.find(u => u.id === id);
  
    // 2. 사용자를 찾지 못한 경우 오류 처리 및 함수 종료
    if (!user) {
      console.error(`User with ID ${id} not found in users array!`);
      alert(`사용자 정보(ID: ${id})를 찾을 수 없습니다.`);
      return;
    }
  
    console.log("User found:", user);
  
    // 3. 모달 내부의 각 정보 표시 영역(dd 태그)에 사용자 데이터 채우기
    //    textContent를 사용하여 안전하게 텍스트를 설정합니다.
    document.getElementById('view-user-name').textContent = user.userName || '-';
    document.getElementById('view-user-id').textContent = user.userId || '-';
    document.getElementById('view-user-dept').textContent = user.department || '-';
    document.getElementById('view-user-role').textContent = user.userRole || '-'; // TODO: 역할 이름을 한글로?
    document.getElementById('view-user-status').textContent = user.userStatus || '-'; // TODO: 상태를 한글로?
    document.getElementById('view-user-reg-date').textContent = user.registrationDate || '-';
    document.getElementById('view-user-last-login').textContent = user.lastLogin || '-';
  
    // 4. 정보가 채워진 모달 창을 화면에 보여주기
    openModal('view-user-modal');
  }

  function deleteUser(userIdToDelete) {
    // 1. 사용자에게 정말 삭제할 것인지 확인 받기
    if (confirm(`사용자 ID ${userIdToDelete}번 데이터를 정말 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`)) {
      console.log(`Attempting to delete user with ID: ${userIdToDelete}`);
  
      // 2. 전역 `users` 배열에서 삭제할 사용자의 인덱스 찾기
      const userIndex = users.findIndex(user => user.id === userIdToDelete);
  
      // 3. 사용자를 찾았는지 확인
      if (userIndex > -1) {
        // 4. 배열에서 사용자 제거 (splice 사용)
        users.splice(userIndex, 1); // userIndex 위치에서 1개 요소 제거
        console.log(`User with ID ${userIdToDelete} removed from array.`);
  
        // 5. 사용자 목록 테이블 다시 그리기
        renderUserList(users);
        alert(`사용자 ID ${userIdToDelete}번 데이터가 삭제되었습니다.`); // (선택사항) 성공 메시지
  
      } else {
        // 사용자를 찾지 못한 경우 (오류 상황)
        console.error(`User with ID ${userIdToDelete} not found for deletion.`);
        alert(`오류: 삭제하려는 사용자(ID: ${userIdToDelete})를 찾을 수 없습니다.`);
      }
    } else {
      // 사용자가 '취소'를 누른 경우
      console.log(`User deletion cancelled for ID: ${userIdToDelete}`);
    }
  }

  function viewPartnerDetails(partnerId) {
    console.log(`Attempting to view details for partner ID: ${partnerId}`);
  
    // 1. 전역 `partners` 배열에서 해당 ID의 거래처 찾기
    const partner = partners.find(p => p.id === partnerId);
  
    // 2. 거래처를 찾지 못한 경우 오류 처리 및 함수 종료
    if (!partner) {
      console.error(`Partner with ID ${partnerId} not found in partners array!`);
      alert(`거래처 정보(ID: ${partnerId})를 찾을 수 없습니다.`);
      return;
    }
  
    console.log("Partner found:", partner);
  
    // 3. 모달 내부의 각 정보 표시 영역(span 태그)에 거래처 데이터 채우기
    document.getElementById('view-partner-id').textContent = partner.id;
    document.getElementById('view-partner-name').textContent = partner.partnerName || '-';
    document.getElementById('view-partner-type').textContent = partner.partnerType || '-'; // TODO: 한글 변환?
    document.getElementById('view-partner-biz-num').textContent = partner.businessRegNumber || '-';
    document.getElementById('view-partner-items').textContent = partner.mainItems || '-';
    document.getElementById('view-partner-address').textContent = partner.address || '-';
    document.getElementById('view-partner-contact-person').textContent = partner.contactPerson || '-';
    document.getElementById('view-partner-tel').textContent = partner.phoneNumber || '-';
    document.getElementById('view-partner-email').textContent = partner.email || '-';
    document.getElementById('view-partner-fax').textContent = partner.faxNumber || '-';
    document.getElementById('view-partner-reg-date').textContent = partner.registrationDate || '-';
    document.getElementById('view-partner-notes').textContent = partner.notes || '-'; // 비고
  
    // 4. 정보가 채워진 모달 창을 화면에 보여주기
    openModal('view-partner-details-modal');
  }
  
function editPartner(partnerId) { openModal('add-partner-modal', partners.find(p => p.id === partnerId)); }
function deletePartner(partnerIdToDelete) {
    if (confirm(`거래처 ID ${partnerIdToDelete}번 데이터를 정말 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`)) {
      console.log(`Attempting to delete partner with ID: ${partnerIdToDelete}`);
        const partnerIndex = partners.findIndex(p => p.id === partnerIdToDelete);
        if (partnerIndex > -1) {
        partners.splice(partnerIndex, 1);
        console.log(`Partner with ID ${partnerIdToDelete} removed from array.`);
        renderPartnerList(partners); 
        alert(`거래처 ID ${partnerIdToDelete}번 데이터가 삭제되었습니다.`); 
      } else {
        console.error(`Partner with ID ${partnerIdToDelete} not found for deletion.`);
        alert(`오류: 삭제하려는 거래처(ID: ${partnerIdToDelete})를 찾을 수 없습니다.`);
      }
    } else {
      console.log(`Partner deletion cancelled for ID: ${partnerIdToDelete}`);
    }
  }
  
  function viewItemDetails(itemId) {
    console.log(`Attempting to view details for item ID: ${itemId}`);
  
    // 1. 전역 `items` 배열에서 해당 ID의 품목 찾기
    const item = items.find(i => i.id === itemId);
  
    // 2. 품목을 찾지 못한 경우 오류 처리 및 함수 종료
    if (!item) {
      console.error(`Item with ID ${itemId} not found in items array!`);
      alert(`품목 정보(ID: ${itemId})를 찾을 수 없습니다.`);
      return;
    }
  
    console.log("Item found:", item);
  
    // 3. 공통 정보 필드 채우기
    document.getElementById('view-item-id').textContent = item.id;
    document.getElementById('view-item-type').textContent = item.itemType || '-'; // TODO: 한글 변환?
    document.getElementById('view-item-code').textContent = item.itemCode || '-';
    document.getElementById('view-item-name').textContent = item.itemName || '-';
    document.getElementById('view-item-spec').textContent = item.itemSpec || '-';
    document.getElementById('view-item-unit').textContent = item.itemUnit || '-';
    document.getElementById('view-item-reg-date').textContent = item.registrationDate || '-';
    document.getElementById('view-item-notes').textContent = item.notes || '-';
  
    // 이미지 설정 (placeholder 포함)
    const imageView = document.getElementById('view-item-image');
    if (imageView) {
      imageView.src = item.imageUrl || 'images/placeholder_item.png'; // Placeholder 경로 확인 필요
      imageView.alt = item.itemName || '품목 이미지';
    }
  
    // 4. 품목 구분에 따른 상세 정보 섹션 표시/숨기기 및 데이터 채우기
    const typeSpecificSections = [
      'view-item-raw-details',
      'view-item-product-details',
      'view-item-equipment-details',
      'view-item-inspection-equipment-details'
    ];
    typeSpecificSections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) section.style.display = 'none'; // 일단 모두 숨김
    });
  
    // 해당하는 타입의 섹션만 표시하고 데이터 채우기
    if (item.itemType === 'RawMaterial') {
      const section = document.getElementById('view-item-raw-details');
      if (section) section.style.display = 'contents'; // display: contents; 로 dl 구조 유지
      document.getElementById('view-item-purchase-price').textContent = item.purchasePrice?.toLocaleString() || '-'; // 숫자 포맷팅
      document.getElementById('view-item-supplier').textContent = item.supplierName || '-';
    } else if (item.itemType === 'Product') {
      const section = document.getElementById('view-item-product-details');
      if (section) section.style.display = 'contents';
      document.getElementById('view-item-selling-price').textContent = item.sellingPrice?.toLocaleString() || '-'; // 숫자 포맷팅
    } else if (item.itemType === 'Equipment') {
      const section = document.getElementById('view-item-equipment-details');
      if (section) section.style.display = 'contents';
      // TODO: Equipment 관련 상세 정보 ID 확인 및 데이터 채우기 (예시)
      // document.getElementById('view-equip-supplierName-in-item').textContent = item.supplierName || '-'; // 품목 데이터 필드 확인 필요
      // document.getElementById('view-equip-power-in-item').textContent = item.powerConsumption ? `${item.powerConsumption} kW` : '-'; // 품목 데이터 필드 확인 필요
      // document.getElementById('view-equip-resp-dept-in-item').textContent = item.responsibleDepartment || '-'; // 품목 데이터 필드 확인 필요
       console.warn("Equipment specific details view not fully implemented yet."); // 구현 필요 알림
    } else if (item.itemType === 'InspectionEquipment') {
      const section = document.getElementById('view-item-inspection-equipment-details');
      if (section) section.style.display = 'contents';
      // TODO: Inspection Equipment 관련 상세 정보 ID 확인 및 데이터 채우기 (예시)
      // document.getElementById('view-insp-equip-manufacturer-in-item').textContent = item.manufacturer || '-';
      // document.getElementById('view-insp-equip-calibrationCycle-in-item').textContent = item.calibrationCycle || '-';
      // ... (기타 검사장비 필드) ...
       console.warn("Inspection Equipment specific details view not fully implemented yet."); // 구현 필요 알림
    }
  
    // 5. 정보가 채워진 모달 창을 화면에 보여주기
    openModal('view-item-details-modal');
  }
  
function editItem(itemId) { openModal('add-item-modal', items.find(i => i.id === itemId)); }
function deleteItem(itemIdToDelete) {
    // 1. 사용자에게 정말 삭제할 것인지 확인 받기
    if (confirm(`품목 ID ${itemIdToDelete}번 데이터를 정말 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`)) {
        console.log(`Attempting to delete item with ID: ${itemIdToDelete}`);

        // 2. 전역 `items` 배열에서 삭제할 품목의 인덱스 찾기
        const itemIndex = items.findIndex(item => item.id === itemIdToDelete);

        // 3. 품목을 찾았는지 확인
        if (itemIndex > -1) {
            // 4. 배열에서 품목 제거 (splice 사용)
            items.splice(itemIndex, 1); // itemIndex 위치에서 1개 요소 제거
            console.log(`Item with ID ${itemIdToDelete} removed from array.`);

            // 5. 품목 목록 테이블 다시 그리기 (변경된 items 배열 사용)
            renderItemList(items); // *** 중요: 화면 업데이트 ***
            alert(`품목 ID ${itemIdToDelete}번 데이터가 삭제되었습니다.`); // (선택사항) 성공 메시지

        } else {
            // 품목을 찾지 못한 경우 (오류 상황)
            console.error(`Item with ID ${itemIdToDelete} not found for deletion.`);
            alert(`오류: 삭제하려는 품목(ID: ${itemIdToDelete})를 찾을 수 없습니다.`);
        }
    } else {
        // 사용자가 '취소'를 누른 경우
        console.log(`Item deletion cancelled for ID: ${itemIdToDelete}`);
    }
}

function viewCustomerDetails(customerId) { alert(`View Customer ${customerId} details needed`); }
function editCustomer(customerId) { openModal('add-customer-modal', customers.find(c => c.id === customerId)); }
function deleteCustomer(customerId) { if(confirm(`Delete Customer ${customerId}?`)) alert('Customer Delete needed'); }
function viewQuoteDetails(quoteId) { alert(`View Quote ${quoteId} details needed.`); /* TODO: 상세 보기 구현 */ }
function openEditQuoteModal(quoteId) { alert(`Edit Quote ${quoteId} needed.`); /* TODO: 수정 모달 구현 */ }
function deleteQuote(quoteId) { if(confirm(`Delete Quote ${quoteId}?`)) alert('Quote Delete needed'); }
function printQuote() { alert('견적서 인쇄 기능 구현 필요'); }
function convertToOrderFromList(quoteId) { /* ... 함수 내용 ... */ } // 이전 제공 코드 사용
function convertToOrder() { /* ... 함수 내용 ... */ } // 이전 제공 코드 사용
function viewOrderDetails(orderId) { alert(`View Order ${orderId} details needed`); }
function openEditOrderModal(orderId) { alert(`Edit Order ${orderId} needed`); }
function cancelOrder(orderId) { if(confirm(`Cancel Order ${orderId}?`)) alert('Order Cancel needed'); }
function printOrder() { alert('주문서 인쇄 기능 구현 필요'); }
function registerBom(parentItemId) {
    console.log(`Registering BOM for parent item ID: ${parentItemId}`);
  
    // 1. 부모 품목 정보 찾기
    const parentItem = items.find(i => i.id === parentItemId);
    if (!parentItem) {
      alert(`BOM을 등록할 부모 품목(ID: ${parentItemId})을 찾을 수 없습니다.`);
      return;
    }
  
    // 2. 모달 제목 및 부모 품목 정보 필드 채우기
    document.getElementById('bom-modal-title').textContent = `BOM 정보: ${parentItem.itemName}`;
    document.getElementById('bom-parent-item-id').value = parentItem.id; // Hidden input
    document.getElementById('bom-parent-item-code').textContent = parentItem.itemCode || '-';
    // *** 중요: 모달 HTML에는 itemModel 대신 itemName 사용 ***
    document.getElementById('bom-parent-item-model').textContent = parentItem.itemSpec || '-'; // 모델명 대신 규격(itemSpec) 표시 (필요시 수정)
    document.getElementById('bom-parent-item-spec').textContent = ''; // 규격 필드는 모델명으로 사용했으므로 비움 (필요시 수정)
    document.getElementById('bom-parent-item-unit-info').textContent = parentItem.itemUnit || '-';
  
    // 3. 자식 품목 목록 테이블 채우기
    renderBomChildItems(parentItemId); // 헬퍼 함수 호출
  
    // 4. 모달 열기 (기존 openModal 대신 직접 제어)
    const modal = document.getElementById('bom-registration-modal');
    if (modal) {
        modal.style.display = 'block';
        console.log(`Opened modal: bom-registration-modal`);
    } else {
        console.error(`Modal with ID "bom-registration-modal" not found!`);
    }
  }
  
  /**
   * (헬퍼 함수) 특정 부모 품목 ID에 대한 자식 품목 목록을 BOM 모달 테이블에 렌더링
   * @param {number} parentId 부모 품목의 ID
   */
  function renderBomChildItems(parentId) {
    const tableBody = document.getElementById('bom-items-table-body');
    if (!tableBody) {
        console.error('BOM items table body not found!');
        return;
    }
    tableBody.innerHTML = ''; // 기존 내용 비우기

    // 전역 bomData 객체에서 해당 부모 ID의 자식 목록 가져오기
    const childItems = bomData[parentId] || [];
    console.log(`Found ${childItems.length} child items in bomData for parent ${parentId}`);

    if (childItems.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="9" style="text-align: center;">구성 품목이 없습니다.</td></tr>';
        return;
    }

    childItems.forEach((child, index) => {
        const row = tableBody.insertRow();
        const newRowIndex = index + 1;

        // addBomItemRow와 유사한 구조로 셀 내용 생성
        row.innerHTML = `
            <td>${newRowIndex}</td>
            <td><span class="bom-child-type">${child.itemType || '-'}</span></td>
            <td>
                <input type="hidden" class="bom-child-item-id" value="${child.childItemId || ''}">
                <input type="text" class="bom-child-item-code" value="${child.childItemCode || ''}" placeholder="코드 검색..." style="width: 70%;" readonly>
                <button type="button" class="search-button-small" onclick="openBomChildSearch(this)" title="하위 품목 검색">🔍</button>
            </td>
            <td><span class="bom-child-item-name">${child.childItemName || '-'}</span></td>
            <td><span class="bom-child-item-spec">${child.itemSpec || '-'}</span></td>
            <td><span class="bom-child-item-unit">${child.childItemUnit || '-'}</span></td>
            <td><input type="number" class="bom-child-quantity" value="${child.quantity || 1}" min="0" step="any" style="width: 90%;"></td>
            <td><input type="text" class="bom-child-remarks" value="${child.remarks || ''}" style="width: 90%;"></td>
            <td><button type="button" class="delete-button" onclick="this.closest('tr').remove()">삭제</button></td>
          `;
    });
    console.log(`Rendered ${childItems.length} child items into editable rows for parent ${parentId}`);
}
  
  // (참고) deleteBomChildItem 함수도 script.js에 추가되어 있어야 합니다.
  /**
   * BOM 모달 내의 자식 품목 행을 삭제하는 함수 (시각적 제거만)
   * @param {HTMLButtonElement} buttonElement 클릭된 삭제 버튼 요소
   * @param {number} parentId 부모 품목 ID
   * @param {string | number} childIdentifier 삭제할 자식 품목의 식별자 (예: childItemCode)
   */
  
function deleteBomChildItem(buttonElement, parentId, childIdentifier) {
    if (confirm(`BOM 구성 품목 '${childIdentifier}' 항목을 정말 삭제하시겠습니까?`)) {
      const rowToDelete = buttonElement.closest('tr');
      if (rowToDelete) {
        rowToDelete.remove();
        console.log(`Removed child item '${childIdentifier}' row visually from BOM for parent ${parentId}.`);
      } else {
        console.error('Could not find the row to delete.');
      }
    }
  }

function addBomItemRow() {
    const tableBody = document.getElementById('bom-items-table-body');
    if (!tableBody) {
      console.error('BOM items table body not found!');
      return;
    }
  
    // "구성 품목이 없습니다." 메시지 행이 있다면 제거
    const noItemsRow = tableBody.querySelector('td[colspan="9"]');
    if (noItemsRow) {
      tableBody.innerHTML = ''; // 테이블 내용 비우기
    }
  
    const newRowIndex = tableBody.rows.length + 1; // 새 행 번호 계산
    const row = tableBody.insertRow(); // 테이블 끝에 새 행 추가
  
    // 새 행에 필요한 셀(td)들과 입력 요소(input 등)를 추가
    row.innerHTML = `
        <td>${newRowIndex}</td>
        <td><span class="bom-child-type">-</span></td>
        <td>
            <input type="hidden" class="bom-child-item-id">
            <input type="text" class="bom-child-item-code" placeholder="코드 검색..." style="width: 70%;" readonly>
            <button type="button" class="search-button-small" onclick="openBomChildSearch(this)" title="하위 품목 검색">🔍</button>
        </td>
        <td><span class="bom-child-item-name">-</span></td>
        <td><span class="bom-child-item-spec">-</span></td>
        <td><span class="bom-child-item-unit">-</span></td>
        <td><input type="number" class="bom-child-quantity" value="1" min="0" step="any" style="width: 90%;"></td>
        <td><input type="text" class="bom-child-remarks" style="width: 90%;"></td>
        <td><button type="button" class="delete-button" onclick="this.closest('tr').remove()">삭제</button></td>
      `;
    console.log('Added a new empty row to BOM table.');
  }
  
  // --- (아직 구현 안 됨) 하위 품목 검색 모달을 여는 함수 ---
  /**
   * 하위 품목 검색 모달을 여는 함수 (자리 표시자)
   * @param {HTMLButtonElement} buttonElement 클릭된 검색 버튼
   */
function openBomChildSearch(buttonElement) {
    // 1. 검색 버튼이 속한 행(tr)을 찾아서 전역 변수에 저장
    targetBomRowForSearch = buttonElement.closest('tr');
    if (!targetBomRowForSearch) {
      console.error("Could not find the target row for BOM child search.");
      return;
    }
    console.log("Target row for search:", targetBomRowForSearch);
  
    // 2. 검색 모달의 이전 검색 결과 비우기 (선택 사항)
    const searchResultsBody = document.getElementById('bom-child-item-search-results');
    if (searchResultsBody) {
      searchResultsBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">검색어를 입력하고 검색 버튼을 누르세요.</td></tr>';
    }
    const searchInput = document.getElementById('bom-child-search-input');
    if (searchInput) {
      searchInput.value = ''; // 검색창 비우기
    }
  
    // 3. 하위 품목 검색 모달 열기
    openModal('bom-child-item-search-modal');
  }
  
  function selectBomChildItem(selectedItemId) {
    // 1. 전역 변수에 저장된 대상 행(tr)이 있는지 확인
    if (!targetBomRowForSearch) {
        console.error("Target BOM row is not set!");
        alert("품목 정보를 채워넣을 대상 행을 찾을 수 없습니다.");
        return;
    }

    // 2. 선택된 품목 정보 찾기
    const selectedItem = items.find(item => item.id === selectedItemId);
    if (!selectedItem) {
        console.error(`Selected item with ID ${selectedItemId} not found!`);
        alert(`선택한 품목 정보(ID: ${selectedItemId})를 찾을 수 없습니다.`);
        return;
    }

    console.log("Selected item:", selectedItem);

    // 3. 대상 행 내부의 해당 요소들을 찾아서 정보 채우기
    const idInput = targetBomRowForSearch.querySelector('.bom-child-item-id');
    const codeInput = targetBomRowForSearch.querySelector('.bom-child-item-code');
    const nameSpan = targetBomRowForSearch.querySelector('.bom-child-item-name');
    const specSpan = targetBomRowForSearch.querySelector('.bom-child-item-spec');
    const unitSpan = targetBomRowForSearch.querySelector('.bom-child-item-unit');
    const typeSpan = targetBomRowForSearch.querySelector('.bom-child-type'); // 타입 표시용 span

    if (idInput && codeInput && nameSpan && specSpan && unitSpan && typeSpan) {
        idInput.value = selectedItem.id; // 숨겨진 필드에 ID 저장
        codeInput.value = selectedItem.itemCode; // 코드 input에 표시
        nameSpan.textContent = selectedItem.itemName;
        specSpan.textContent = selectedItem.itemSpec || '-';
        unitSpan.textContent = selectedItem.itemUnit || '-';
        typeSpan.textContent = selectedItem.itemType || '-'; // 타입 표시
    } else {
        console.error("One or more elements not found in the target BOM row.");
        alert("대상 행에서 정보를 채워넣을 요소를 찾는 데 실패했습니다.");
    }

    // 4. 대상 행 정보 초기화 및 검색 모달 닫기
    targetBomRowForSearch = null; // 대상 행 정보 초기화
    closeModal('bom-child-item-search-modal'); // 검색 모달 닫기
    console.log("Populated BOM row and closed search modal.");
}

function searchBomChildItems() {
    const searchTerm = document.getElementById('bom-child-search-input').value.toLowerCase();
    const resultsBody = document.getElementById('bom-child-item-search-results');
    if (!resultsBody) return;

    resultsBody.innerHTML = ''; // 이전 결과 지우기

    // 품목 필터링 (원자재 또는 반제품만 검색 - 필요시 변경)
    const filteredItems = items.filter(item =>
        (item.itemType === 'RawMaterial' || item.itemType === 'SemiFinished') &&
        (item.itemCode.toLowerCase().includes(searchTerm) || item.itemName.toLowerCase().includes(searchTerm))
    );

    if (filteredItems.length === 0) {
        resultsBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">검색 결과가 없습니다.</td></tr>';
        return;
    }

    // 검색 결과를 테이블 행으로 만들어 추가
    filteredItems.forEach(item => {
        const row = resultsBody.insertRow();
        row.insertCell().textContent = item.itemCode;
        row.insertCell().textContent = item.itemName;
        row.insertCell().textContent = item.itemSpec || '-';
        row.insertCell().textContent = item.itemUnit || '-';
        row.insertCell().textContent = item.itemType || '-'; // 구분 표시
        // '선택' 버튼 추가, 클릭 시 전역 selectBomChildItem 함수 호출
        row.insertCell().innerHTML = `<button type="button" class="select-button" onclick="selectBomChildItem(${item.id})">선택</button>`;
    });

    // 수정된 console.log (</span> 제거)
    console.log(`Found ${filteredItems.length} child items matching "${searchTerm}"`);
}

function saveBom() {
    console.log("--- saveBom function started ---");

    // 1. 부모 품목 ID 가져오기
    const parentItemIdInput = document.getElementById('bom-parent-item-id');
    if (!parentItemIdInput || !parentItemIdInput.value) {
        console.error("Parent item ID not found in modal.");
        alert("오류: 부모 품목 ID를 찾을 수 없습니다.");
        return;
    }
    const parentItemId = parseInt(parentItemIdInput.value);
    console.log(`Parent Item ID: ${parentItemId}`);

    // 2. 테이블 바디 요소 가져오기
    const tableBody = document.getElementById('bom-items-table-body');
    if (!tableBody) {
        console.error("BOM items table body not found!");
        alert("오류: BOM 테이블 요소를 찾을 수 없습니다.");
        return;
    }

    // 3. 테이블 행 데이터 추출 및 새 BOM 데이터 구성
    const newChildItems = [];
    const rows = tableBody.querySelectorAll('tr');

    console.log(`Found ${rows.length} rows in the BOM table.`);

    rows.forEach((row, index) => {
        // 빈 행이나 "데이터 없음" 행 건너뛰기
        if (row.querySelector('td[colspan="9"]')) {
            console.log(`Skipping 'no data' row.`);
            return;
        }
        if (row.cells.length < 9) { // 예상 컬럼 수보다 적으면 건너뛰기
             console.warn(`Row ${index + 1} has less than 9 cells, skipping.`);
             return;
        }


        // 각 셀에서 데이터 추출 시도
        const childItemIdInput = row.querySelector('.bom-child-item-id');
        const childItemCodeInput = row.querySelector('.bom-child-item-code'); // input 요소
        const childItemNameSpan = row.querySelector('.bom-child-item-name'); // span 요소
        const childItemSpecSpan = row.querySelector('.bom-child-item-spec'); // span 요소
        const childItemUnitSpan = row.querySelector('.bom-child-item-unit'); // span 요소
        const childItemTypeSpan = row.querySelector('.bom-child-type');     // span 요소 (자재 구분)
        const quantityInput = row.querySelector('.bom-child-quantity'); // input 요소
        const remarksInput = row.querySelector('.bom-child-remarks');   // input 요소

        // 필수 요소들이 존재하는지 확인
        if (!childItemIdInput || !childItemCodeInput || !childItemNameSpan || !childItemSpecSpan || !childItemUnitSpan || !childItemTypeSpan || !quantityInput || !remarksInput) {
            console.warn(`Row ${index + 1}: Could not find all required elements. Skipping row.`);
            // alert(`오류: ${index + 1}번째 행의 품목 정보를 완전히 가져올 수 없습니다. 확인 후 다시 시도해주세요.`);
            // return; // 또는 오류 처리 후 계속 진행할지 결정
            return; // 일단 문제가 있는 행은 건너뛰도록 처리
        }

        // 데이터 추출 (값이 없을 경우 기본값 처리)
        const childItemId = childItemIdInput.value ? parseInt(childItemIdInput.value) : null;
        const childItemCode = childItemCodeInput.value || '';
        const childItemName = childItemNameSpan.textContent || '';
        const itemSpec = childItemSpecSpan.textContent || '';
        const childItemUnit = childItemUnitSpan.textContent || '';
        const itemType = childItemTypeSpan.textContent || '';
        const quantity = quantityInput.value ? parseFloat(quantityInput.value) : 0;
        const remarks = remarksInput.value || '';

        // 필수 값 유효성 검사 (예: 품목 코드가 없거나, 소요량이 0 이하인 경우)
        if (!childItemCode) {
            alert(`${index + 1}번째 행의 품목 코드가 비어있습니다. 품목을 검색하여 선택해주세요.`);
            return; // 저장 중단
        }
        if (quantity <= 0) {
             alert(`${index + 1}번째 행('${childItemName}')의 소요량은 0보다 커야 합니다.`);
             return; // 저장 중단
        }


        console.log(`Row ${index + 1} data:`, { childItemId, childItemCode, childItemName, itemSpec, itemType, childItemUnit, quantity, remarks });

        // 새 자식 품목 객체 생성
        newChildItems.push({
            childItemId: childItemId, // 실제 DB 저장 시에는 itemCode로 부모/자식 관계를 맺는 것이 더 일반적일 수 있음
            childItemCode: childItemCode,
            childItemName: childItemName,
            itemSpec: itemSpec,
            itemType: itemType,
            childItemUnit: childItemUnit,
            quantity: quantity,
            remarks: remarks
        });
    });

    // 4. 전역 bomData 업데이트
    bomData[parentItemId] = newChildItems; // 해당 부모 ID의 BOM 정보를 새 배열로 덮어쓰기

    console.log(`Updated bomData for parent ID ${parentItemId}:`, bomData[parentItemId]);
    console.log("Current global bomData:", JSON.parse(JSON.stringify(bomData))); // 전체 bomData 확인 (디버깅용)

    // 5. 피드백 및 모달 닫기
    alert(`BOM 정보가 성공적으로 저장되었습니다. (Parent ID: ${parentItemId})`);
    closeModal('bom-registration-modal');

    console.log("--- saveBom function finished ---");
}

// --- 견적/주문 품목 추가 관련 ---
function searchQuoteItems() { alert('견적 품목 검색 기능 구현 필요'); }
function selectQuoteItem(selectedItemId) { alert('견적 품목 선택 기능 구현 필요'); }
function addQuoteItemRow(item = null) { alert('견적 품목 행 추가 기능 구현 필요'); }
function deleteQuoteItemRow(buttonElement) { alert('견적 품목 행 삭제 기능 구현 필요'); }
function calculateQuoteRowTotal(row) { /* ... 총액 계산 로직 필요 ... */ }
function calculateQuoteTotal() { /* ... 총액 계산 로직 필요 ... */ }
function addOrderItemRowWithData(item, quantity, unitPrice) { alert('주문 품목 행 추가(데이터 포함) 기능 구현 필요'); }
function deleteOrderItemRow(buttonElement) { alert('주문 품목 행 삭제 기능 구현 필요'); }
function calculateOrderRowTotal(row) { /* ... 총액 계산 로직 필요 ... */ }
function calculateOrderTotal() { /* ... 총액 계산 로직 필요 ... */ }
function searchOrderItems() { alert('주문 품목 검색 기능 구현 필요'); }
function selectOrderItem(selectedItemId) { alert('주문 품목 선택 기능 구현 필요'); }
function addOrderItemRow(item = null) { alert('주문 품목 행 추가 기능 구현 필요'); }

// --- 페이지 네비게이션 함수 ---
async function navigateToSection(targetId, params = {}) {
    console.log(`Navigating to section: ${targetId}`);
    const mainContentArea = document.querySelector('.main-content');
    if (!mainContentArea) {
        console.error("Main content area (.main-content) not found!");
        return;
    }

    const fileName = sectionToFileMap[targetId];
    if (fileName === undefined) {
        console.warn(`No file mapping found for section ID: ${targetId}. Might be a parent menu.`);
        updateSidebarActiveState(targetId);
        return;
    }

    const filePath = `views/${fileName}`;

    try {
        console.log(`Workspaceing content from: ${filePath}`);
        const response = await fetch(filePath);
        if (!response.ok) {
            if (response.status === 404) {
                 throw new Error(`파일을 찾을 수 없습니다: ${filePath}. views 폴더 확인 필요.`);
            } else {
                throw new Error(`HTTP error! status: ${response.status} for ${filePath}`);
            }
        }
        const htmlContent = await response.text();
        mainContentArea.innerHTML = htmlContent;
        console.log(`Successfully loaded and injected content from ${filePath}`);

        const allSectionsInMain = mainContentArea.querySelectorAll('section');
        let targetSectionFound = false;
        if (allSectionsInMain.length > 0) {
            allSectionsInMain.forEach(section => {
                if (section.id === `${targetId}-view`) {
                    section.style.display = 'block';
                    targetSectionFound = true;
                    console.log(`Displaying target section: #${section.id}`);
                } else {
                    section.style.display = 'none';
                }
            });
            if (!targetSectionFound) {
                console.warn(`Target section #${targetId}-view not found in ${fileName}. Displaying first section.`);
                allSectionsInMain[0].style.display = 'block';
                targetSectionFound = true;
            }
        } else {
             console.warn(`No <section> elements found in ${fileName}. Displaying all content.`);
             targetSectionFound = true;
        }

        // 섹션 표시 후 데이터 로딩/초기화 함수 호출
        if (targetSectionFound) {
             if (targetId === 'dashboard-overview') { updateDashboardTodoList(); updateDashboardKPIs(); }
             else if (targetId === 'user-mgmt') { renderUserList(users); }
             else if (targetId === 'partner-mgmt') { renderPartnerList(partners); }
             else if (targetId === 'company-mgmt') { displayCompanyInfo(); }
             else if (targetId === 'item-mgmt') { renderItemList(items); }
             else if (targetId === 'customer-mgmt') { renderCustomerList(customers); }
             else if (targetId === 'quote-mgmt') { displayQuotes(sampleQuotes); }
             else if (targetId === 'order-mgmt') { displayOrders(sampleOrders); }
             else if (targetId === 'supplier-mgmt') { renderPartnerList(partners.filter(p => p.partnerType === 'Supplier'), 'supplier-table-body'); }
             else if (targetId === 'equipment-mgmt') { renderEquipmentList(items.filter(i => i.itemType === 'Equipment')); }
             else if (targetId === 'inspection-equip-mgmt') { renderInspectionEquipmentList(items.filter(i => i.itemType === 'InspectionEquipment')); }
             else { console.log(`No specific render function called for ${targetId}.`); }
        }

    } catch (error) {
        console.error('Error fetching or processing section:', error);
        mainContentArea.innerHTML = `<p style='color:red;'>오류: '<span class="math-inline">\{targetId\}' 화면 \(</span>{fileName || 'N/A'})을 불러오는 중 문제가 발생했습니다. (${error.message})</p>`;
    }

    updateSidebarActiveState(targetId);
}

// 사이드바 활성화 상태 업데이트 함수
function updateSidebarActiveState(targetId) {
     document.querySelectorAll('.sidebar nav a').forEach(a => a.classList.remove('active'));
     const currentLink = document.querySelector(`.sidebar nav a[href="#${targetId}"]`);
     if (currentLink) {
         currentLink.classList.add('active');
         const parentUl = currentLink.closest('ul');
         if (parentUl && parentUl.previousElementSibling?.tagName === 'A') { // Optional chaining
             parentUl.previousElementSibling.classList.add('active');
         }
         console.log(`Updated sidebar active state for: ${targetId}`);
     } else {
         console.warn(`Could not find sidebar link for targetId: ${targetId}`);
     }
}

// --- Helper Functions ---
function updateDashboardTodoList() {
     const todoListElement = document.getElementById('dashboard-todo-list');
     if(todoListElement) {
          todoListElement.innerHTML = '<li>[승인] 구매 요청서 PR-005 검토</li><li>[작성] 4월 3주차 주간 업무 보고서</li>'; // 더 구체적인 예시
     }
}

function updateDashboardKPIs() {
    const kpis = { // 실제 데이터 연동 필요
        'db-kpi-today-orders': sampleOrders.filter(o => o.orderDate === new Date().toISOString().split('T')[0]).length, // 오늘 주문 수 (예시)
        'db-kpi-today-receipts': 7, // 임시
        'db-kpi-today-shipments': 12, // 임시
        'db-kpi-pending-shipments': sampleOrders.filter(o => o.orderStatus === 'Pending' || o.orderStatus === 'Confirmed').length // 예시: 미출고 주문 수
    };
     for (const id in kpis) {
         const element = document.getElementById(id);
         if (element) element.textContent = `${kpis[id]} 건`;
         else console.warn(`KPI Element #${id} not found.`);
     }
     console.log("Updated dashboard KPIs.");
}

// <<<--- initializeApp 함수 --->>>
function initializeApp() {
    console.log("[Init] initializeApp started");
    updateHeader();

    // --- 사이드바 네비게이션 이벤트 리스너 설정 ---
    document.querySelectorAll('.sidebar nav a').forEach(link => {
        link.addEventListener('click', function (event) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                event.preventDefault();
                const targetId = href.substring(1);
                const parentLi = this.closest('li');
                const isParentLink = parentLi && parentLi.querySelector('ul');

                if (isParentLink) {
                    this.classList.toggle('active');
                } else {
                    navigateToSection(targetId);
                }
            }
        });
    });
    console.log("[Init] Attached listeners to sidebar links");

    // --- 폼 제출 이벤트 리스너 (document.body 사용) ---
    document.body.addEventListener('submit', function(event) {
        // 폼 제출 기본 동작(페이지 새로고침) 막기
        if (event.target.tagName === 'FORM') {
            event.preventDefault();
            const form = event.target;
            const formId = form.id;
            console.log(`Delegated 'submit' event caught for form: #${formId}`);
    
            try {
                const formData = new FormData(form); // 폼 데이터 가져오기
    
                switch (formId) {
                    case 'edit-company-form': {
                        console.log('기업 정보 수정 폼 제출됨:');
                        companyData.companyName = formData.get('companyName');
                        companyData.businessRegistrationNumber = formData.get('businessRegistrationNumber');
                        companyData.address = formData.get('address');
                        companyData.ceoName = formData.get('ceoName');
                        companyData.mainProducts = formData.get('mainProducts');
                        companyData.phoneNumber = formData.get('phoneNumber');
                        companyData.faxNumber = formData.get('faxNumber');
                        console.log('companyData object after update:', JSON.parse(JSON.stringify(companyData)));
                        const sealImageFile = formData.get('sealImage');
                        const updateDisplayAndClose = () => {
                            displayCompanyInfo();
                            closeModal('edit-company-modal');
                            console.log('기업 정보 수정 완료 및 화면 업데이트.');
                        };
                        if (sealImageFile && sealImageFile.size > 0) {
                            const reader = new FileReader();
                            reader.onload = function(e) {
                                try {
                                    companyData.sealImageUrl = e.target.result;
                                    updateDisplayAndClose();
                                } catch (error) {
                                    console.error(error);
                                    alert("이미지 처리 오류");
                                    closeModal('edit-company-modal');
                                }
                            };
                            reader.onerror = function() {
                                console.error("FileReader error");
                                alert("이미지 읽기 오류");
                                closeModal('edit-company-modal');
                            };
                            reader.readAsDataURL(sealImageFile);
                        } else {
                            updateDisplayAndClose();
                        }
                        break;
                    } // edit-company-form 끝
    
                    case 'signup-form': {
                        if (formData.get('password') !== formData.get('confirmPassword')) {
                            alert('비밀번호 불일치');
                            return;
                        }
                        console.log('회원가입 폼 제출:', Object.fromEntries(formData));
                        alert('회원가입 요청 (서버 연동 필요)');
                        closeModal('signup-modal');
                        break;
                    }
    
                    case 'add-user-form': {
                        const userIdToEdit = formData.get('userIdToEdit');
                        const password = formData.get('password');
                        const confirmPassword = formData.get('confirmPassword');
                        // 비밀번호 필드가 비어있지 않거나, 또는 신규 추가 모드일 때만 비밀번호 일치 검사
                        if ((password || !userIdToEdit) && (password !== confirmPassword)) {
                            alert('비밀번호가 일치하지 않습니다.'); return;
                        }
                        const newUserData = {
                            id: userIdToEdit ? parseInt(userIdToEdit) : nextUserId++,
                            userId: formData.get('userId'),
                            userName: formData.get('userName'),
                            department: formData.get('department'),
                            userRole: formData.get('userRole'),
                            userStatus: formData.get('userStatus'),
                            // 수정 시 기존 등록일/로그인 유지, 추가 시 오늘 날짜/null
                            registrationDate: userIdToEdit ? users.find(u=>u.id === parseInt(userIdToEdit)).registrationDate : new Date().toISOString().split('T')[0],
                            lastLogin: userIdToEdit ? users.find(u=>u.id === parseInt(userIdToEdit))?.lastLogin : null // Optional chaining
                        };
                         // 비밀번호 필드가 채워져 있을 경우에만 비밀번호 업데이트 로직 추가 필요 (실제로는 해싱 등 필요)
                         // if (password) { /* newUserData.password = hash(password); */ }
    
                        if (userIdToEdit) { // 수정
                            users = users.map(user => user.id === newUserData.id ? {...user, ...newUserData} : user); // 기존 정보에 새 정보 덮어쓰기 (id, 등록일 등 유지)
                            alert('사용자 정보가 수정되었습니다.');
                        } else { // 추가
                            // 아이디 중복 체크 (추가 시에만)
                            if (users.some(user => user.userId === newUserData.userId)) {
                                 alert('이미 사용 중인 아이디입니다.');
                                 return;
                            }
                            users.push(newUserData);
                            alert('신규 사용자가 추가되었습니다.');
                        }
                        console.log(`${userIdToEdit ? 'Updated' : 'Added'} user:`, newUserData);
                        closeModal('add-user-modal');
                        renderUserList(users); // 목록 새로고침
                        break;
                    }
    
                    case 'add-partner-form': {
                        const partnerIdToEdit = formData.get('partnerIdToEdit');
                        const newPartnerData = {
                            id: partnerIdToEdit ? parseInt(partnerIdToEdit) : nextPartnerId++,
                            partnerType: formData.get('partnerType'),
                            partnerName: formData.get('partnerName'),
                            businessRegNumber: formData.get('businessRegNumber'),
                            mainItems: formData.get('mainItems'),
                            address: formData.get('address'),
                            contactPerson: formData.get('contactPerson'),
                            phoneNumber: formData.get('phoneNumber'),
                            email: formData.get('email'),
                            faxNumber: formData.get('faxNumber'),
                            notes: formData.get('notes'),
                            registrationDate: partnerIdToEdit ? partners.find(p=>p.id === parseInt(partnerIdToEdit)).registrationDate : (formData.get('registrationDate') || new Date().toISOString().split('T')[0])
                            // defectCount 등 다른 필드도 필요시 업데이트
                        };
                        if (partnerIdToEdit) { // 수정
                            partners = partners.map(p => p.id === newPartnerData.id ? {...p, ...newPartnerData} : p);
                            alert('거래처 정보 수정 완료.');
                        } else { // 추가
                            // 거래처명 중복 체크 등 필요시 추가
                             newPartnerData.defectCount = 0; // 예: 신규 추가시 불량 건수 0으로 초기화
                            partners.push(newPartnerData);
                            alert('신규 거래처 추가 완료.');
                        }
                        console.log(`${partnerIdToEdit ? 'Updated' : 'Added'} partner:`, newPartnerData);
                        closeModal('add-partner-modal');
                        renderPartnerList(partners); // 목록 새로고침
                         // 공급처 관리 화면이 열려있다면 거기도 업데이트
                         if (document.getElementById('supplier-table-body')) {
                              renderPartnerList(partners.filter(p => p.partnerType === 'Supplier'), 'supplier-table-body');
                         }
                        break;
                    }
    
                    case 'add-item-form': {
                        const itemIdToEdit = formData.get('itemIdToEdit');
                        // TODO: 이미지 파일 처리 추가 필요 (formData.get('itemImage'))
                        const newItemData = {
                            id: itemIdToEdit ? parseInt(itemIdToEdit) : nextItemId++,
                            itemType: formData.get('itemType'),
                            itemCode: formData.get('itemCode'),
                            itemName: formData.get('itemName'),
                            itemSpec: formData.get('itemSpec'),
                            itemUnit: formData.get('itemUnit'),
                            sellingPrice: formData.get('sellingPrice') ? parseFloat(formData.get('sellingPrice')) : null,
                            purchasePrice: formData.get('purchasePrice') ? parseFloat(formData.get('purchasePrice')) : null,
                            supplierName: formData.get('supplierName'), // 원자재 필드에서 name="supplierName" 사용 가정
                            supplierId: formData.get('supplierId') ? parseInt(formData.get('supplierId')) : null, // 원자재 필드 (hidden) name="supplierId" 사용 가정
                            registrationDate: itemIdToEdit ? items.find(i=>i.id === parseInt(itemIdToEdit)).registrationDate : (formData.get('registrationDate') || new Date().toISOString().split('T')[0]),
                            notes: formData.get('notes'),
                            imageUrl: null, // TODO: Update with actual image URL after upload/storage
                            // 설비/검사장비 추가 정보 (해당 타입일 때만 의미 있음)
                            responsibleDepartment: formData.get('responsibleDepartment'), // 설비/검사장비 필드 name="responsibleDepartment" 사용 가정
                            manufacturer: formData.get('manufacturer'), // 검사장비 필드 name="manufacturer" 사용 가정
                            calibrationCycle: formData.get('calibrationCycle'), // 검사장비 필드 name="calibrationCycle" 사용 가정
                            lastCalibrationDate: formData.get('lastCalibrationDate'), // 검사장비 필드 name="lastCalibrationDate" 사용 가정
                            calibrationStatus: formData.get('calibrationStatus') // 검사장비 필드 name="calibrationStatus" 사용 가정
                             // powerConsumption 등 다른 필드도 폼 name 맞춰서 추가
                        };
                        if (itemIdToEdit) { // 수정
                             // 품목 코드 중복 체크 (수정 시에는 자기 자신 제외)
                             if (items.some(item => item.itemCode === newItemData.itemCode && item.id !== newItemData.id)) {
                                 alert('이미 사용 중인 품목 코드입니다.');
                                 return;
                             }
                            items = items.map(item => item.id === newItemData.id ? {...item, ...newItemData} : item);
                            alert('품목 정보가 수정되었습니다.');
                        } else { // 추가
                            // 품목 코드 중복 체크
                             if (items.some(item => item.itemCode === newItemData.itemCode)) {
                                 alert('이미 사용 중인 품목 코드입니다.');
                                 return;
                             }
                            items.push(newItemData);
                            alert('새 품목이 추가되었습니다.');
                        }
                        console.log(`${itemIdToEdit ? 'Updated' : 'Added'} item:`, newItemData);
                        closeModal('add-item-modal');
                        renderItemList(items); // 목록 새로고침
                        // 다른 관련 목록(예: 설비 목록, 검사장비 목록)도 필요시 새로고침
                        if (newItemData.itemType === 'Equipment' && document.getElementById('equipment-table-body')) {
                             renderEquipmentList(items.filter(i => i.itemType === 'Equipment'));
                        }
                        // else if (newItemData.itemType === 'InspectionEquipment' && ...)
                        break;
                    }
    
                    // *** ▼▼▼ 설비 추가/수정 폼 처리 케이스 (여기 추가!) ▼▼▼ ***
                    case 'add-equipment-form': {
                        const itemIdToEdit = formData.get('itemIdToEdit'); // Hidden input에서 ID 가져오기 (name="itemIdToEdit")
                        // TODO: 이미지 파일 처리 로직 추가 필요 (formData.get('itemImage'))
    
                        // 폼 데이터로 새 설비 객체 생성
                        const newEquipmentData = {
                            id: itemIdToEdit ? parseInt(itemIdToEdit) : nextItemId++,
                            itemType: 'Equipment', // 설비 타입 고정
                            itemCode: formData.get('itemCode'), // 설비번호 (name="itemCode")
                            itemName: formData.get('itemName'), // 설비명 (name="itemName")
                            itemSpec: formData.get('itemSpec'), // 모델명 (name="itemSpec")
                            itemUnit: '대', // 단위 (기본값 '대' 또는 폼에서 받도록 수정)
                            sellingPrice: null,
                            purchasePrice: null, // 필요시 폼에서 입력받아 저장
                            supplierName: formData.get('supplierName'), // 구입처 (name="supplierName")
                            supplierId: formData.get('supplierId') ? parseInt(formData.get('supplierId')) : null, // 구입처 ID (hidden input name="supplierId")
                            registrationDate: itemIdToEdit ? items.find(i=>i.id === parseInt(itemIdToEdit)).registrationDate : (formData.get('registrationDate') || new Date().toISOString().split('T')[0]),
                            notes: formData.get('notes'), // 비고 (name="notes")
                            imageUrl: null, // TODO: 이미지 처리 후 URL 업데이트
                            // 설비 관련 추가 필드
                            responsibleDepartment: formData.get('responsibleDepartment'), // 책임부서 (폼에 name="responsibleDepartment" input 필요)
                            // powerConsumption: formData.get('powerConsumption') ? parseFloat(formData.get('powerConsumption')) : null, // 전력소모량 (폼에 name="powerConsumption" input 필요)
                            lastMaintenanceDate: itemIdToEdit ? items.find(i => i.id === parseInt(itemIdToEdit))?.lastMaintenanceDate : null // 최종 점검일 등
                        };
    
                         // 전력량 등의 정보를 비고(notes) 필드에 저장하는 경우, 여기서 조합 로직 필요
                         // const power = formData.get('powerConsumption');
                         // const existingNotes = formData.get('notes');
                         // newEquipmentData.notes = power ? `전기사용량: ${power}kW\n책임부서: ${newEquipmentData.responsibleDepartment || ''}\n${existingNotes}` : `책임부서: ${newEquipmentData.responsibleDepartment || ''}\n${existingNotes}`;
    
    
                        // 데이터 업데이트 또는 추가
                        if (itemIdToEdit) { // 수정
                             // 설비번호 중복 체크 (수정 시에는 자기 자신 제외)
                             if (items.some(item => item.itemCode === newEquipmentData.itemCode && item.id !== newEquipmentData.id && item.itemType === 'Equipment')) {
                                 alert('이미 사용 중인 설비번호입니다.');
                                 return;
                             }
                            items = items.map(item => (item.id === newEquipmentData.id ? {...item, ...newEquipmentData} : item));
                            alert('설비 정보가 수정되었습니다.');
                        } else { // 추가
                             // 설비번호 중복 체크
                             if (items.some(item => item.itemCode === newEquipmentData.itemCode && item.itemType === 'Equipment')) {
                                 alert('이미 사용 중인 설비번호입니다.');
                                 return;
                             }
                            items.push(newEquipmentData);
                            alert('신규 설비가 추가되었습니다.');
                        }
    
                        console.log(`${itemIdToEdit ? 'Updated' : 'Added'} equipment:`, newEquipmentData);
                        closeModal('add-equipment-modal');
                        renderEquipmentList(items.filter(i => i.itemType === 'Equipment')); // 목록 새로고침
                        break;
                    }
                    // *** ▲▲▲ 설비 추가/수정 폼 처리 케이스 끝 ▲▲▲ ***
    
                    case 'add-customer-form': { /* ... 고객 추가/수정 처리 ... */ break; }
                    case 'add-quote-form':    { /* ... 견적 추가/수정 처리 ... */ break; }
                    case 'add-order-form':    { /* ... 주문 추가/수정 처리 ... */ break; }
                    // --- (기타 필요한 폼 ID case 추가) ---
    
                    default:
                        console.warn(`Unhandled form submission for form ID: ${formId}`);
                }
            } catch (error) {
                console.error(`Error processing submission for form #${formId}:`, error);
                alert(`양식 제출 중 오류가 발생했습니다: ${error.message}`);
                // 오류 발생 시 모달을 닫을지 여부 결정
                // closeModal(form.closest('.modal')?.id);
            }
        }
    });
    
    console.log("[Init] Attached delegated 'submit' listener to document.body");

    // 모달 배경 클릭 리스너
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) { closeModal(event.target.id); }
    });
    console.log("[Init] Attached listener for modal background click");

    console.log("[Init] initializeApp finished");
} // initializeApp 함수 끝


// --- 파일 맨 아래 ---
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");
    initializeApp();
    navigateToSection('dashboard-overview');
    console.log("Initial navigation to dashboard triggered.");
}); // DOMContentLoaded 이벤트 리스너 끝