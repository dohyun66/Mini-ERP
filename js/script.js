// --- 전역 변수 선언 ---
let isLoggedIn = false; // Default state, should be updated by actual login logic
// const headerLoggedIn = document.getElementById('header-logged-in'); // DOMContentLoaded 전에 찾으면 에러 발생 가능 -> initializeApp 내부에서 처리
// const headerLoggedOut = document.getElementById('header-logged-out'); // DOMContentLoaded 전에 찾으면 에러 발생 가능 -> initializeApp 내부에서 처리
let items = [
    { id: 1, itemType: 'Product', itemCode: 'P00001', itemName: '센서용 메인보드 PCB', itemSpec: 'PCB-A1-Rev1.2', itemUnit: 'EA', sellingPrice: 12000, purchasePrice: null, supplierName: null, supplierId: null, registrationDate: '2023-11-01', notes: '4-Layer, Rev 1.2', imageUrl: null },
    { id: 2, itemType: 'Product', itemCode: 'P00002', itemName: '스마트 센서 모듈', itemSpec: 'Sensor-A1', itemUnit: 'EA', sellingPrice: 55000, purchasePrice: null, supplierName: null, supplierId: null, registrationDate: '2024-01-15', notes: '온도/습도 감지, Wifi 통신', imageUrl: null },
    { id: 3, itemType: 'Product', itemCode: 'P00003', itemName: '센서 모듈 케이스', itemSpec: 'Case-A', itemUnit: 'EA', sellingPrice: 3000, purchasePrice: null, supplierName: null, supplierId: null, registrationDate: '2023-12-20', notes: 'ABS, 백색, 방수 처리', imageUrl: null },
    { id: 101, itemType: 'RawMaterial', itemCode: 'M-STL-001', itemName: '스테인리스 강판', itemSpec: 'SUS304-HL 1.0T', itemUnit: 'EA', sellingPrice: null, purchasePrice: 150000, supplierName: '(주)강철상사', supplierId: 2, registrationDate: '2023-05-10', notes: '1219*2438', imageUrl: null },
    { id: 102, itemType: 'RawMaterial', itemCode: 'M-IPA-001', itemName: '이소프로필 알코올 (IPA)', itemSpec: 'Grade A, 99.9%', itemUnit: 'L', sellingPrice: null, purchasePrice: 25000, supplierName: '화학나라', supplierId: 4, registrationDate: '2022-11-20', notes: '5L 용기', imageUrl: null },
    { id: 103, itemType: 'RawMaterial', itemCode: 'M-ABS-001', itemName: 'ABS 펠릿 (백색)', itemSpec: 'HF-380, Grade 2', itemUnit: 'kg', sellingPrice: null, purchasePrice: 3500, supplierName: 'ABC 플라스틱', supplierId: 5, registrationDate: '2022-09-01', notes: '', imageUrl: null },
    { id: 201, itemType: 'Equipment', itemCode: 'CNC-001', itemName: 'CNC 선반 A', itemSpec: 'MODEL-X1', itemUnit: '대', sellingPrice: null, purchasePrice: 150000000, supplierName: '한국기계', supplierId: null, registrationDate: '2024-03-10', notes: '전기사용량: 15.5kW\n책임부서: 생산팀', imageUrl: null, responsibleDepartment: '생산팀', lastMaintenanceDate: '2024-12-01' }, // 샘플 데이터 추가
    { id: 202, itemType: 'Equipment', itemCode: 'PACK-005', itemName: '자동 포장기', itemSpec: 'PACK-AUTO-03', itemUnit: '대', sellingPrice: null, purchasePrice: 45000000, supplierName: '월드패키징', supplierId: null, registrationDate: '2023-11-20', notes: '전기사용량: 3.2kW\n책임부서: 출하팀', imageUrl: null, responsibleDepartment: '출하팀', lastMaintenanceDate: '2025-02-15' }, // 샘플 데이터 추가
    { id: 301, itemType: 'InspectionEquipment', itemCode: 'INS-CAL-001', itemName: '디지털 캘리퍼스', itemSpec: 'Mitutoyo 500-196-30', itemUnit: '개', sellingPrice: null, purchasePrice: 180000, supplierName: 'Mitutoyo', supplierId: null, registrationDate: '2020-01-10', notes: '교정주기:12개월', imageUrl: null, manufacturer: 'Mitutoyo', calibrationCycle: '12개월', lastCalibrationDate: '2024-11-15', calibrationStatus: 'Normal', responsibleDepartment: '품질팀' },
    { id: 302, itemType: 'InspectionEquipment', itemCode: 'INS-MIC-003', itemName: '마이크로미터', itemSpec: '0-25mm', itemUnit: '개', sellingPrice: null, purchasePrice: 95000, supplierName: 'NSK', supplierId: null, registrationDate: '2019-07-25', notes: '교정주기:12개월', imageUrl: null, manufacturer: 'NSK', calibrationCycle: '12개월', lastCalibrationDate: '2024-05-20', calibrationStatus: 'Scheduled', responsibleDepartment: '품질팀' },
    { id: 303, itemType: 'InspectionEquipment', itemCode: 'INS-LEN-015', itemName: '강철자', itemSpec: '300mm', itemUnit: '개', sellingPrice: null, purchasePrice: 15000, supplierName: 'Shinwa', supplierId: null, registrationDate: '2018-10-01', notes: '교정 제외', imageUrl: null, manufacturer: 'Shinwa', calibrationCycle: '교정 제외', lastCalibrationDate: '', calibrationStatus: 'Excluded', responsibleDepartment: '생산팀' }
];
let users = [
    { id: 1, userId: 'admin', userName: '관리자', department: '관리부', userRole: 'Admin', userStatus: 'Active', registrationDate: '2023-01-01', lastLogin: '2025-04-23' },
    { id: 2, userId: 'user1', userName: '김생산', department: '생산팀', userRole: 'RecordCreator', userStatus: 'Active', registrationDate: '2023-05-10', lastLogin: '2025-04-22' },
    { id: 3, userId: 'user2', userName: '박품질', department: '품질팀', userRole: 'Reviewer', userStatus: 'Active', registrationDate: '2023-06-15', lastLogin: '2025-04-24' }
];
let partners = [
    { id: 2, partnerType: 'Supplier', partnerName: '(주)강철상사', businessRegNumber: '120-81-12345', mainItems: '특수강', contactPerson: '김철수 부장', phoneNumber: '02-1111-2222', email: 'cs.kim@kangchul.co.kr', registrationDate: '2022-08-01', address: '서울시 강남구', faxNumber: '02-1111-2223', notes: '월말 정산', defectCount: 3 },
    { id: 1, partnerType: 'Customer', partnerName: '미래전자', businessRegNumber: '211-85-67890', mainItems: '전자 부품', contactPerson: '박영희 대리', phoneNumber: '031-3333-4444', email: 'yh.park@mirae-elec.com', registrationDate: '2021-03-15', address: '경기도 수원시', faxNumber: '', notes: '' },
    { id: 3, partnerType: 'Subcontractor', partnerName: '정밀도금기술', businessRegNumber: '310-82-98765', mainItems: '표면 처리 (도금)', contactPerson: '이정밀 사장', phoneNumber: '064-5555-6666', email: 'master@jmtogeum.kr', registrationDate: '2023-01-10', address: '제주시 애월읍', faxNumber: '', notes: '급건 처리 가능' },
    { id: 4, partnerType: 'Supplier', partnerName: '화학나라', businessRegNumber: '111-22-33333', mainItems: '화공약품', contactPerson: '최화학 팀장', phoneNumber: '031-222-3333', email: 'chem@chemworld.com', registrationDate: '2022-11-20', address: '경기도 안산시', faxNumber: '', notes: 'MSDS 필수 첨부', defectCount: 1 },
    { id: 5, partnerType: 'Supplier', partnerName: 'ABC 플라스틱', businessRegNumber: '444-55-66666', mainItems: 'ABS 펠릿', contactPerson: '', phoneNumber: '032-777-8888', email: '', registrationDate: '2022-09-01', address: '인천광역시 남동구', faxNumber: '', notes: '', defectCount: 0 }
];
let customers = [
    { id: 1, customerName: '미래전자', businessRegNumber: '211-85-67890', ceoName: '김미래', phoneNumber: '031-3333-4444', representativeUserId: 2, status: 'Active', registrationDate: '2021-03-15', address: '경기도 수원시', notes: '' },
    { id: 2, customerName: '(주)성공시스템', businessRegNumber: '123-88-00001', ceoName: '이성공', phoneNumber: '02-9876-5432', representativeUserId: 1, status: 'Active', registrationDate: '2022-07-20', address: '서울시 구로구', notes: '월말 결제' },
    { id: 3, customerName: '잠재고객사 알파', businessRegNumber: '', ceoName: '', phoneNumber: '010-1234-0001', representativeUserId: 2, status: 'Potential', registrationDate: '2024-03-01', address: '', notes: '견적 요청 상태' }
];
let bomData = {
    2: [
        { childItemId: 1, childItemCode: 'P00001', childItemName: '센서용 메인보드 PCB', itemSpec: 'PCB-A1-Rev1.2', itemType: 'Product', childItemUnit: 'EA', quantity: 1, remarks: '주요 부품' },
        { childItemId: 3, childItemCode: 'P00003', childItemName: '센서 모듈 케이스', itemSpec: 'Case-A', itemType: 'Product', childItemUnit: 'EA', quantity: 1, remarks: '외장 케이스' },
        { childItemId: 103, childItemCode: 'M-ABS-001', childItemName: 'ABS 펠릿 (백색)', itemSpec: 'HF-380, Grade 2', itemType: 'RawMaterial', childItemUnit: 'kg', quantity: 0.05, remarks: '케이스 사출용' }
    ],
    1: [
        { childItemId: 101, childItemCode: 'M-STL-001', childItemName: '스테인리스 강판', itemSpec: 'SUS304-HL 1.0T', itemType: 'RawMaterial', childItemUnit: 'EA', quantity: 0.1, remarks: '' },
        { childItemId: 102, childItemCode: 'M-IPA-001', childItemName: '이소프로필 알코올 (IPA)', itemSpec: 'Grade A, 99.9%', itemType: 'RawMaterial', childItemUnit: 'L', quantity: 0.01, remarks: '세척용' }
    ]
};
let companyData = {
    companyName: "내 회사",
    businessRegistrationNumber: "000-00-00000",
    address: "등록된 주소 없음",
    ceoName: "미등록",
    mainProducts: "",
    phoneNumber: "00-0000-0000",
    faxNumber: "",
    sealImageUrl: null
};
// 견적 데이터 샘플플
const sampleQuotes = [
    {
      id: 'q-001',
      quoteNumber: 'QT20250424-001',
      customerName: '(주)행복상사',
      quoteDate: '2025-04-24',
      expiryDate: '2025-05-24',
      totalAmount: 580000, // (참고: 아래 품목들의 합계 = 10*55000 + 10*3000 = 580000)
      status: 'Sent',
      statusText: '전송됨',
      authorName: '김영업',
      notes: '첫 번째 샘플 견적의 비고란입니다.\n납기일을 꼭 지켜주세요.',
      items: [ // <<< 각 견적에 포함된 품목 목록 추가
        // itemId는 상단에 정의된 전체 items 배열의 id를 참조합니다.
        { itemId: 2, quantity: 10, unitPrice: 55000 }, // item id 2 = 스마트 센서 모듈
        { itemId: 3, quantity: 10, unitPrice: 3000 }   // item id 3 = 센서 모듈 케이스
      ]
    },
    {
      id: 'q-002',
      quoteNumber: 'QT20250423-005',
      customerName: '테스트 컴퍼니',
      quoteDate: '2025-04-23',
      expiryDate: '2025-05-23',
      totalAmount: 115000, // (참고: 아래 품목들의 합계 = 5*12000 + 1*55000 = 115000)
      status: 'Draft',
      statusText: '작성중',
      authorName: '박지원',
      notes: '',
      items: [
        { itemId: 1, quantity: 5, unitPrice: 12000 }, // item id 1 = 센서용 메인보드 PCB
        { itemId: 2, quantity: 1, unitPrice: 55000 }  // item id 2 = 스마트 센서 모듈
      ]
    },
    // 필요하다면 다른 샘플 견적 데이터에도 items 배열을 추가하세요.
  ];

  // 샘플 주문 데이터 저장용 배열 (초기에는 비어있거나 기존 주문 데이터 추가)
let sampleOrders = [
    // { id: 'ord-001', orderNumber: 'ORD20250420-001', customerName: '기존고객사', orderDate: '2025-04-20', ... items: [...] },
];
// 샘플 주문 ID 생성을 위한 변수 (간단한 방식)
let nextOrderIdCounter = sampleOrders.length + 1;

let nextItemId = Math.max(...items.map(i => i.id)) + 1; // ID 자동 증가 보완
let nextUserId = Math.max(...users.map(u => u.id)) + 1;
let nextPartnerId = Math.max(...partners.map(p => p.id)) + 1;
let nextCustomerId = Math.max(...customers.map(c => c.id)) + 1;
let bomNextRowIndex = 1;
let targetBomRowForSearch = null;

// --- 함수 정의들 ---

// Basic Navigation & Modal Logic 관련 함수
function updateHeader() {
    // 헤더 DOM 요소는 initializeApp 내부에서 찾는 것이 안전합니다.
    const headerLoggedIn = document.getElementById('header-logged-in');
    const headerLoggedOut = document.getElementById('header-logged-out');
    if (!headerLoggedIn || !headerLoggedOut) return; // 요소 못찾으면 종료

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
        if (form) { form.reset(); }

        // z-index 처리
        if (modalId === 'bom-child-item-search-modal') {
            modal.style.zIndex = 1001;
            console.log(`Set z-index for ${modalId} to 1001`);
        } else {
            modal.style.zIndex = '';
        }

        // Edit Mode Population Logic
        if (dataToEdit) {
            console.log(`Opening modal ${modalId} in EDIT mode with data:`, dataToEdit);
            // 각 모달 ID에 따른 폼 채우기 로직 (기존 코드)
            if (modalId === 'add-workorder-modal') {
                document.getElementById('workorder-modal-title').textContent = '작업 지시 수정';
                document.getElementById('workorder-id').value = dataToEdit.id;
                // ... rest of work order fields ...
            } else if (modalId === 'add-user-modal') {
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
            } else if (modalId === 'add-partner-modal') {
                document.getElementById('add-partner-modal').querySelector('h2').textContent = '거래처 정보 수정';
                document.getElementById('edit-partner-id').value = dataToEdit.id;
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
            } else if (modalId === 'edit-company-modal') {
                console.log(`Opening modal ${modalId} for editing company info`);
                populateEditCompanyForm();
            } else if (modalId === 'add-item-modal') {
                document.getElementById('item-modal-title').textContent = '품목 정보 수정';
                document.getElementById('edit-item-id').value = dataToEdit.id;
                document.getElementById('add-item-type').value = dataToEdit.itemType;
                handleItemTypeChange(); // Call this after setting type
                document.getElementById('add-item-code').value = dataToEdit.itemCode;
                document.getElementById('add-item-name').value = dataToEdit.itemName;
                document.getElementById('add-item-spec').value = dataToEdit.itemSpec || '';
                document.getElementById('add-item-unit').value = dataToEdit.itemUnit;
                document.getElementById('add-item-notes').value = dataToEdit.notes || '';
                document.getElementById('add-item-reg-date').value = dataToEdit.registrationDate || '';
                document.getElementById('add-item-reg-date').readOnly = true;
                if (dataToEdit.itemType === 'RawMaterial') {
                    document.getElementById('add-item-purchase-price').value = dataToEdit.purchasePrice || '';
                    document.getElementById('add-item-supplier').value = dataToEdit.supplierName || '';
                    document.getElementById('add-item-supplier-id').value = dataToEdit.supplierId || '';
                } else if (dataToEdit.itemType === 'Product') {
                    document.getElementById('add-item-selling-price').value = dataToEdit.sellingPrice || '';
                }
            } else if (modalId === 'add-equipment-modal') {
                document.getElementById('add-equipment-modal').querySelector('h2').textContent = '설비 정보 수정';
                document.getElementById('edit-equipment-id').value = dataToEdit.id;
                document.getElementById('add-equip-name').value = dataToEdit.itemName;
                document.getElementById('add-equip-model').value = dataToEdit.itemSpec || '';
                document.getElementById('add-equip-number').value = dataToEdit.itemCode;
                document.getElementById('add-equip-supplier').value = dataToEdit.supplierName || '';
                document.getElementById('add-equip-supplier-id').value = dataToEdit.supplierId || '';
                const powerMatch = dataToEdit.notes?.match(/전기사용량:\s*([\d.]+)\s*kW/);
                document.getElementById('add-equip-power').value = powerMatch ? powerMatch[1] : '';
                document.getElementById('add-equip-reg-date').value = dataToEdit.registrationDate || '';
                document.getElementById('add-equip-reg-date').readOnly = true;
                let notesWithoutPower = dataToEdit.notes?.replace(/전기사용량:\s*[\d.]+\s*kW\n?/, '').trim();
                document.getElementById('add-equip-notes').value = notesWithoutPower || '';
            } else if (modalId === 'add-inspection-equip-modal') {
                document.getElementById('add-inspection-equip-modal').querySelector('h2').textContent = '검사장비 정보 수정';
                document.getElementById('edit-inspection-equip-id').value = dataToEdit.id;
                document.getElementById('add-insp-equip-id').value = dataToEdit.itemCode;
                document.getElementById('add-insp-equip-name').value = dataToEdit.itemName;
                document.getElementById('add-insp-equip-model').value = dataToEdit.itemSpec || '';
                document.getElementById('add-insp-equip-manufacturer').value = dataToEdit.manufacturer || '';
                document.getElementById('add-insp-equip-cycle').value = dataToEdit.calibrationCycle || '';
                document.getElementById('add-insp-equip-last-cal').value = dataToEdit.lastCalibrationDate || '';
                document.getElementById('add-insp-equip-reg-date').value = dataToEdit.registrationDate || '';
                document.getElementById('add-insp-equip-reg-date').readOnly = true;
                document.getElementById('add-insp-equip-status').value = dataToEdit.calibrationStatus || 'Normal';
                document.getElementById('add-insp-equip-notes').value = dataToEdit.notes || '';
            } else if (modalId === 'add-customer-modal') {
                 document.getElementById('add-customer-modal').querySelector('h2').textContent = '고객 정보 수정';
                 document.getElementById('edit-customer-id').value = dataToEdit.id;
                 document.getElementById('add-cust-name').value = dataToEdit.customerName;
                 document.getElementById('add-cust-biz-num').value = dataToEdit.businessRegNumber || '';
                 document.getElementById('add-cust-ceo').value = dataToEdit.ceoName || '';
                 document.getElementById('add-cust-tel').value = dataToEdit.phoneNumber || '';
                 document.getElementById('add-cust-address').value = dataToEdit.address || '';
                 document.getElementById('add-cust-rep-id').value = dataToEdit.representativeUserId || ''; // Assuming select options are loaded
                 document.getElementById('add-cust-status').value = dataToEdit.status;
                 document.getElementById('add-cust-reg-date').value = dataToEdit.registrationDate || '';
                 document.getElementById('add-cust-reg-date').readOnly = true; // Usually cannot change registration date
                 document.getElementById('add-cust-notes').value = dataToEdit.notes || '';
            }
            // ... potentially other modals ...

        } else {
            // Reset titles for Add mode
            console.log(`Opening modal ${modalId} in ADD mode`);
            if (modalId === 'add-workorder-modal') {
                document.getElementById('workorder-modal-title').textContent = '신규 작업 지시 추가';
                document.getElementById('workorder-id').value = '';
                // ... reset other fields
            } else if (modalId === 'add-user-modal') {
                document.getElementById('add-user-modal').querySelector('h2').textContent = '신규 인원 추가';
                document.getElementById('edit-user-id').value = '';
                document.getElementById('add-user-id').readOnly = false;
                document.getElementById('add-user-password').required = true;
                document.getElementById('add-user-confirm-password').required = true;
                document.getElementById('add-user-password').placeholder = '';
                document.getElementById('add-user-confirm-password').placeholder = '';
            } else if (modalId === 'add-partner-modal') {
                 document.getElementById('add-partner-modal').querySelector('h2').textContent = '신규 거래처 추가';
                 document.getElementById('edit-partner-id').value = '';
                 document.getElementById('add-partner-reg-date').readOnly = false;
                 document.getElementById('add-partner-reg-date').value = new Date().toISOString().split('T')[0];
            } else if (modalId === 'add-item-modal') {
                document.getElementById('item-modal-title').textContent = '신규 품목 추가';
                document.getElementById('edit-item-id').value = '';
                document.getElementById('add-item-reg-date').readOnly = false;
                document.getElementById('add-item-reg-date').value = new Date().toISOString().split('T')[0];
                handleItemTypeChange(); // Reset fields based on default type
            } else if (modalId === 'add-equipment-modal') {
                document.getElementById('add-equipment-modal').querySelector('h2').textContent = '신규 설비 추가';
                document.getElementById('edit-equipment-id').value = '';
                document.getElementById('add-equip-reg-date').readOnly = false;
                document.getElementById('add-equip-reg-date').value = new Date().toISOString().split('T')[0];
            } else if (modalId === 'add-inspection-equip-modal') {
                document.getElementById('add-inspection-equip-modal').querySelector('h2').textContent = '신규 검사장비 추가';
                document.getElementById('edit-inspection-equip-id').value = '';
                document.getElementById('add-insp-equip-reg-date').readOnly = false;
                document.getElementById('add-insp-equip-reg-date').value = new Date().toISOString().split('T')[0];
            } else if (modalId === 'add-customer-modal') {
                 document.getElementById('add-customer-modal').querySelector('h2').textContent = '신규 고객 추가';
                 document.getElementById('edit-customer-id').value = '';
                 document.getElementById('add-cust-reg-date').readOnly = false;
                 document.getElementById('add-cust-reg-date').value = new Date().toISOString().split('T')[0];
                 // Populate representative dropdown if needed
                 // populateRepresentativeDropdown('add-cust-rep-id');
            }
            // ... other add modals
        }

        modal.style.display = 'block'; // This is the line that makes it visible
        console.log(`Opened modal: ${modalId}`);

    } else {
        console.error(`Modal with ID "${modalId}" not found!`);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        modal.style.zIndex = '';
        console.log(`Closed modal: ${modalId}`);
    }
}

function handleItemTypeChange() {
    const selectedTypeElement = document.getElementById('add-item-type');
    if (!selectedTypeElement) return; // Exit if element not found
    const selectedType = selectedTypeElement.value;

    const rawMaterialFields = document.getElementById('raw-material-fields');
    const productFields = document.getElementById('product-fields');
    const semifinishedFields = document.getElementById('semifinished-fields');

    if(rawMaterialFields) rawMaterialFields.style.display = 'none';
    if(productFields) productFields.style.display = 'none';
    if(semifinishedFields) semifinishedFields.style.display = 'none';

    if (selectedType === 'RawMaterial') {
        if(rawMaterialFields) rawMaterialFields.style.display = 'block';
    } else if (selectedType === 'Product') {
        if(productFields) productFields.style.display = 'block';
    } else if (selectedType === 'SemiFinished') {
        if(semifinishedFields) semifinishedFields.style.display = 'block';
    }
}

function convertToOrderFromList(quoteId) {
    console.log(`리스트에서 견적 ${quoteId} 를 주문으로 직접 생성 시작`);

    // 1. 원본 견적 데이터 찾기
    const quote = sampleQuotes.find(q => q.id === quoteId);
    if (!quote) {
        alert("주문으로 전환할 원본 견적 정보를 찾을 수 없습니다.");
        console.error(`ID '${quoteId}'에 해당하는 견적을 sampleQuotes에서 찾지 못했습니다.`);
        return;
    }

    // --- (선택 사항) 견적 상태 확인 ---
    // if (quote.status === 'Draft') { alert("..."); return; }
    // -------------------------------

    // 2. 새로운 주문 데이터 객체 생성
    const today = new Date().toISOString().split('T')[0];
    const newOrderId = `ORD-${today.replace(/-/g,'')}-${nextOrderIdCounter++}`; // 예: ORD20250425-1

    const newOrder = {
        id: newOrderId, // 고유 주문 ID
        orderNumber: newOrderId, // 주문번호 (ID와 동일하게 사용, 필요시 다른 규칙 적용)
        orderDate: today, // 주문일자 = 오늘
        requestedDeliveryDate: '', // 납기요청일은 비워둠 (또는 기본값 설정)
        customerName: quote.customerName,
        // customerId: quote.customerId, // 고객 ID가 있다면 복사
        representativeName: quote.authorName, // 담당자 (견적 작성자 정보 활용)
        // representativeUserId: quote.authorId, // 담당자 ID가 있다면 복사
        sourceQuoteId: quote.id, // 관련 견적 ID
        sourceQuoteNumber: quote.quoteNumber, // 관련 견적 번호
        totalAmount: quote.totalAmount, // 총액 (견적 금액 그대로 사용, 필요시 재계산)
        orderStatus: 'Pending', // 주문 상태 (예: '접수 대기')
        orderStatusText: '접수 대기', // 주문 상태 텍스트
        notes: `견적 ${quote.quoteNumber} 에서 자동 전환됨.\n${quote.notes || ''}`, // 비고 (자동 전환 명시 및 견적 비고 추가)
        items: quote.items.map(item => ({ // 품목 정보 복사 (깊은 복사)
            itemId: item.itemId,
            quantity: item.quantity,
            unitPrice: item.unitPrice
        }))
    };

    // 3. 생성된 주문 데이터를 sampleOrders 배열에 추가 ("저장" 역할)
    sampleOrders.push(newOrder);
    console.log("새로운 주문 데이터 생성 완료:", newOrder);
    console.log("현재 주문 목록:", sampleOrders);

    // 4. 사용자에게 성공 메시지 표시
    alert(`견적 ${quote.quoteNumber} 가 주문 ${newOrder.orderNumber} 로 성공적으로 전환되었습니다!`);

    // 5. 주문 관리 화면으로 이동
    // (navigateToSection 함수가 화면 전환 및 해당 화면 데이터 로딩/표시를 담당한다고 가정)
    navigateToSection('order-mgmt');

    // --- 중요 ---
    // navigateToSection('order-mgmt-view') 함수는 내부적으로
    // 주문 목록 테이블을 최신 sampleOrders 데이터로 다시 그려주는 로직
    // (예: displayOrders(sampleOrders) 호출)이 포함되어 있어야 합니다.
    // 그렇지 않으면 화면 이동만 되고 새 주문이 목록에 보이지 않을 수 있습니다.
    // ----------------
}

function displayOrders(orders) {
    const orderTableBody = document.getElementById('order-table-body');
    if (!orderTableBody) {
        console.error("주문 테이블 body (order-table-body) 요소를 찾을 수 없습니다!");
        return; // 테이블이 없으면 함수 종료
    }
    orderTableBody.innerHTML = ''; // 기존 테이블 내용 비우기

    if (!orders || orders.length === 0) {
        // 주문 데이터가 없으면 메시지 표시
        const emptyRow = orderTableBody.insertRow();
        const emptyCell = emptyRow.insertCell();
        emptyCell.colSpan = 9; // 주문 테이블 컬럼 수에 맞게 조절
        emptyCell.textContent = '표시할 주문 데이터가 없습니다.';
        emptyCell.style.textAlign = 'center';
        return;
    }

    // 주문 데이터를 하나씩 행으로 추가
    orders.forEach((order, index) => {
        const row = orderTableBody.insertRow();
        row.insertCell().textContent = index + 1; // No
        row.insertCell().textContent = order.orderNumber; // 주문번호
        row.insertCell().textContent = order.customerName; // 고객사명
        row.insertCell().textContent = order.orderDate; // 주문일자
        row.insertCell().textContent = order.requestedDeliveryDate || '-'; // 납기요청일
        const totalAmountCell = row.insertCell(); // 총액
        totalAmountCell.textContent = order.totalAmount ? order.totalAmount.toLocaleString() : '-';
        totalAmountCell.style.textAlign = 'right';
        row.insertCell().textContent = order.orderStatusText || order.orderStatus; // 상태
        row.insertCell().textContent = order.representativeName || '-'; // 담당자(자사)

        // 관리 버튼 셀
        const actionsCell = row.insertCell();
        actionsCell.innerHTML = `
            <button class="view-button" onclick="viewOrderDetails('${order.id}')">상세</button>
            <button class="edit-button" onclick="openEditOrderModal('${order.id}')">수정</button>
            <button class="delete-button" onclick="cancelOrder('${order.id}')">취소</button>
            `;
            // 위 버튼들에 연결된 함수(viewOrderDetails 등)들도 필요합니다. (지금은 alert만 있어도 됨)
    });
    console.log("주문 목록 테이블 표시 완료.");
}

// --- 주문 관리용 버튼 함수 (임시 Placeholder) ---
function viewOrderDetails(orderId) { alert(`View Order ${orderId} details needed`); }
function openEditOrderModal(orderId) { alert(`Edit Order ${orderId} needed`); }
function cancelOrder(orderId) {
    if(confirm(`주문 ${orderId} 를 정말 취소하시겠습니까?`)) {
        alert(`Cancel Order ${orderId} needed`);
        // TODO: sampleOrders 배열에서 상태를 'Canceled' 등으로 변경하고 displayOrders(sampleOrders) 다시 호출
    }
}

// --- Item Management Functions ---
function renderItemList(itemList) { /* ... existing code ... */ }
function viewItemDetails(itemId) { /* ... existing code ... */ }
function editItem(itemId) { /* ... existing code ... */ }
function deleteItem(itemId) { /* ... existing code ... */ }

// --- Equipment Management Functions ---
function renderEquipmentList(equipmentList) { /* ... existing code ... */ }
function searchEquipment() { /* ... existing code ... */ }
function viewEquipmentDetails(id) { /* ... existing code ... */ }
function editEquipment(id) { /* ... existing code ... */ }
function deleteEquipment(id) { /* ... existing code ... */ }

// --- Inspection Equipment Management Functions ---
function renderInspectionEquipmentList(inspectionEquipList) { /* ... existing code ... */ }
function searchInspectionEquipment() { /* ... existing code ... */ }
function viewInspectionEquipmentDetails(id) { /* ... existing code ... */ }
function editInspectionEquipment(id) { /* ... existing code ... */ }
function deleteInspectionEquipment(id) { /* ... existing code ... */ }

// --- BOM Management Functions ---
function openBomModal(parentItemId) { /* ... existing code ... */ }
function addBomItemRow(bomItem = null) { /* ... existing code ... */ }
function searchBomChildItems() { /* ... existing code ... */ }
function selectBomChildItem(selectedItemId) { /* ... existing code ... */ }
function searchChildItemForRow(rowElement) { /* ... existing code ... */ }
function saveBom() { /* ... existing code ... */ }
function deleteBomItemRow(buttonElement) { /* ... existing code ... */ }
function registerBom(id) { openBomModal(id); }

// --- Placeholder functions ---
function searchWorkOrders() { alert('검색 기능 구현 필요'); }
function viewWorkOrder(workOrderId) { alert(`View Work Order ${workOrderId} details needed`); }
function editWorkOrder(workOrderId) { alert(`Edit Work Order ${workOrderId} needed`); }
function deleteWorkOrder(workOrderId) { if(confirm(`Delete WO ${workOrderId}?`)) alert('WO Delete needed'); }
function getWorkOrderDetailsFromServer(workOrderId) { return null; /* Placeholder */ }
function searchQuotes() { alert('견적 검색 기능 구현 필요'); }
function viewQuoteDetails(quoteId) {
    console.log(`상세 보기 요청된 견적 ID: ${quoteId}`);

    // 1. sampleQuotes 배열에서 해당 ID의 견적 데이터 찾기
    const quote = sampleQuotes.find(q => q.id === quoteId);

    if (!quote) {
        alert("해당 견적 정보를 찾을 수 없습니다.");
        console.error(`ID '${quoteId}'에 해당하는 견적을 sampleQuotes에서 찾지 못했습니다.`);
        return;
    }

    // 2. 모달 창 안의 내용 영역 요소 가져오기
    const detailsContentDiv = document.getElementById('quote-details-content');
    if (!detailsContentDiv) {
        alert("상세 정보 표시 영역을 찾을 수 없습니다. (id='quote-details-content')");
        console.error("HTML에서 id='quote-details-content' 요소를 찾지 못했습니다.");
        return;
    }

    // 3. 견적 기본 정보 HTML 생성
    let detailsHtml = `
        <h3 style="text-align:center; margin-bottom: 20px;">견 적 서</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px 20px; margin-bottom: 20px; padding: 15px; border: 1px solid #eee; border-radius: 5px; background-color: #f9f9f9;">
            <div><strong>견적번호:</strong> ${quote.quoteNumber || '-'}</div>
            <div><strong>고객사명:</strong> ${quote.customerName || '-'}</div>
            <div><strong>견적일자:</strong> ${quote.quoteDate || '-'}</div>
            <div><strong>유효기간:</strong> ${quote.expiryDate || '-'}</div>
            <div><strong>상태:</strong> ${quote.statusText || '-'}</div>
            <div><strong>작성자:</strong> ${quote.authorName || '-'}</div>
        </div>
        <hr>
        <h4>견적 품목</h4>
    `;

    // 4. 견적 품목 테이블 HTML 생성
    if (quote.items && quote.items.length > 0) {
        let itemsTableHtml = `
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                    <tr style="background-color: #f2f2f2;">
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: center; width: 5%;">No</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left; width: 30%;">품목명</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left; width: 20%;">규격</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: center; width: 10%;">단위</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: right; width: 10%;">수량</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: right; width: 15%;">단가</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: right; width: 15%;">금액</th>
                    </tr>
                </thead>
                <tbody>
        `;

        let totalAmountCalculated = 0; // 품목 합계 다시 계산

        quote.items.forEach((quoteItem, index) => {
            // 전체 items 배열에서 품목 상세 정보(이름, 규격, 단위) 찾기
            const itemInfo = items.find(i => i.id === quoteItem.itemId);
            const itemName = itemInfo ? itemInfo.itemName : '품목 정보 없음';
            const itemSpec = itemInfo ? (itemInfo.itemSpec || '-') : '-';
            const itemUnit = itemInfo ? itemInfo.itemUnit : '-';

            const quantity = quoteItem.quantity || 0;
            const unitPrice = quoteItem.unitPrice || 0;
            const amount = quantity * unitPrice;
            totalAmountCalculated += amount;

            itemsTableHtml += `
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${index + 1}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${itemName}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${itemSpec}</td>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${itemUnit}</td>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${quantity.toLocaleString()}</td>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${unitPrice.toLocaleString()}</td>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${amount.toLocaleString()}</td>
                </tr>
            `;
        });

        itemsTableHtml += `
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="6" style="border: 1px solid #ddd; padding: 8px; text-align: right; font-weight: bold;">합계 금액:</td>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: right; font-weight: bold;">${totalAmountCalculated.toLocaleString()} 원</td>
                    </tr>
                </tfoot>
            </table>`;
        detailsHtml += itemsTableHtml; // 생성된 테이블 HTML 추가
    } else {
        detailsHtml += `<p style="text-align:center; color:#6c757d; margin-bottom: 20px;">(견적에 포함된 품목이 없습니다.)</p>`;
    }

    // 5. 비고 및 최종 HTML 조립
    detailsHtml += `
        <hr>
        <dl style="display: grid; grid-template-columns: auto 1fr; gap: 5px 10px;">
            <dt style="font-weight: bold;">비고:</dt>
            <dd style="white-space: pre-wrap;">${quote.notes || '(비고 없음)'}</dd>
        </dl>
    `;

    // 6. 모달 내용 업데이트
    detailsContentDiv.innerHTML = detailsHtml;

    // 상세 모달 요소에 현재 보고 있는 견적의 ID를 저장
    const detailsModal = document.getElementById('view-quote-details-modal');
    if (detailsModal) {
        detailsModal.setAttribute('data-current-quote-id', quoteId);
        console.log(`상세 모달에 data-current-quote-id=${quoteId} 설정됨.`);
    } else {
         console.error("상세 모달(view-quote-details-modal) 요소를 찾을 수 없음.");
    }
    // -----------------

    // 7. 모달 창 열기
    openModal('view-quote-details-modal');
    console.log("견적 상세 정보 모달 표시 완료 (품목 포함).");
}
    // 견적서 수정
function openEditQuoteModal(quoteId) {
    console.log(`수정 요청된 견적 ID: ${quoteId}`);

    // 1. sampleQuotes 배열에서 해당 ID의 견적 데이터 찾기
    const quote = sampleQuotes.find(q => q.id === quoteId);

    if (!quote) {
        alert("수정할 견적 정보를 찾을 수 없습니다.");
        console.error(`ID '${quoteId}'에 해당하는 견적을 sampleQuotes에서 찾지 못했습니다.`);
        return;
    }

    // 2. 모달 요소 및 폼 요소 가져오기
    const modal = document.getElementById('add-quote-modal');
    const modalTitle = document.getElementById('quote-modal-title');
    const editQuoteIdInput = document.getElementById('edit-quote-id');
    const quoteDateInput = document.getElementById('add-quote-date');
    const expiryDateInput = document.getElementById('add-quote-expiry-date');
    const customerNameInput = document.getElementById('add-quote-customer-name');
    const customerIdInput = document.getElementById('add-quote-customer-id'); // 고객 ID 필드도 있다면
    const repNameInput = document.getElementById('add-quote-rep-name'); // 담당자 필드
    const repIdInput = document.getElementById('add-quote-rep-id'); // 담당자 ID 필드
    const quoteStatusSelect = document.getElementById('add-quote-status');
    const notesTextarea = document.getElementById('add-quote-notes');
    const itemsTableBody = document.getElementById('quote-items-table-body');
    const totalAmountInput = document.getElementById('add-quote-total-amount'); // 총액 필드

    // 요소들이 모두 존재하는지 확인 (오류 방지)
    if (!modal || !modalTitle || !editQuoteIdInput || !quoteDateInput || !expiryDateInput ||
        !customerNameInput || !customerIdInput || !repNameInput || !repIdInput ||
        !quoteStatusSelect || !notesTextarea || !itemsTableBody || !totalAmountInput) {
        alert("견적 수정 모달의 필수 요소 중 일부를 찾을 수 없습니다. HTML ID를 확인해주세요.");
        console.error("견적 수정 모달의 필수 HTML 요소 중 일부가 누락되었습니다.");
        return;
    }

    // 3. 모달 제목 변경
    modalTitle.textContent = "견적 수정";

    // 4. 숨겨진 필드에 수정할 견적 ID 설정
    editQuoteIdInput.value = quote.id;

    // 5. 폼 필드에 기존 데이터 채우기
    quoteDateInput.value = quote.quoteDate || '';
    expiryDateInput.value = quote.expiryDate || '';
    customerNameInput.value = quote.customerName || '';
    // customerIdInput.value = quote.customerId || ''; // 고객 ID 데이터가 있다면 설정
    repNameInput.value = quote.authorName || ''; // 작성자 이름을 담당자 이름으로 우선 설정 (로직에 맞게 수정 필요)
    // repIdInput.value = quote.authorId || ''; // 작성자 ID 데이터가 있다면 설정
    quoteStatusSelect.value = quote.status || 'Draft'; // 견적 상태 설정
    notesTextarea.value = quote.notes || '';

    // 6. 견적 품목 테이블 채우기
    itemsTableBody.innerHTML = ''; // 기존 품목 행 모두 삭제
    if (quote.items && quote.items.length > 0) {
        quote.items.forEach(quoteItem => {
            // 전체 items 배열에서 품목 상세 정보 찾기
            const itemInfo = items.find(i => i.id === quoteItem.itemId);
            if (itemInfo) {
                // addQuoteItemRow 함수를 호출하여 행을 추가하고 기존 데이터로 값 설정
                // (addQuoteItemRow는 내부적으로 수량/단가 input 값을 설정해야 함 - 아래 예시 참고)
                addQuoteItemRowWithData(itemInfo, quoteItem.quantity, quoteItem.unitPrice);
            } else {
                console.warn(`견적 품목 ID '${quoteItem.itemId}'에 해당하는 품목 정보를 찾을 수 없습니다.`);
                // 필요하다면, 정보 없는 품목을 표시하는 로직 추가
            }
        });
    }

    // 7. 전체 총액 계산 및 표시
    calculateQuoteTotal(); // 품목이 모두 추가된 후 총액 계산

    // 8. 모달 창 열기
    openModal('add-quote-modal');
    console.log(`견적 ID '${quoteId}'의 수정 모달 표시 완료.`);
}

// 기존 addQuoteItemRow 함수를 수정하거나, 데이터를 받아 행을 채우는 새 함수를 만듭니다.
// 여기서는 기존 데이터를 받아 채우는 새 함수 예시입니다.
function addQuoteItemRowWithData(item, quantity, unitPrice) {
    const tableBody = document.getElementById('quote-items-table-body');
    if (!tableBody) return;

    const newRow = tableBody.insertRow();
    const currentItemIndex = tableBody.rows.length;

    // No
    newRow.insertCell(0).textContent = currentItemIndex;

    // 품목
    const itemCell = newRow.insertCell(1);
    itemCell.textContent = item.itemName;
    const itemIdInput = document.createElement('input');
    itemIdInput.type = 'hidden';
    itemIdInput.name = `items[${currentItemIndex-1}][itemId]`;
    itemIdInput.value = item.id;
    itemCell.appendChild(itemIdInput);

    // 규격, 단위
    newRow.insertCell(2).textContent = item.itemSpec || '-';
    newRow.insertCell(3).textContent = item.itemUnit;

    // 수량 (기존 값으로 설정)
    const qtyCell = newRow.insertCell(4);
    const qtyInput = document.createElement('input');
    qtyInput.type = 'number';
    qtyInput.name = `items[${currentItemIndex-1}][quantity]`;
    qtyInput.min = '1';
    qtyInput.step = '1';
    qtyInput.style.width = '90%';
    qtyInput.required = true;
    qtyInput.value = quantity; // <<< 기존 수량 값 설정
    qtyInput.oninput = () => calculateQuoteRowTotal(newRow);
    qtyCell.appendChild(qtyInput);

    // 단가 (기존 값으로 설정)
    const priceCell = newRow.insertCell(5);
    const priceInput = document.createElement('input');
    priceInput.type = 'number';
    priceInput.name = `items[${currentItemIndex-1}][unitPrice]`;
    priceInput.min = '0';
    priceInput.step = 'any';
    priceInput.style.width = '95%';
    priceInput.required = true;
    priceInput.value = unitPrice; // <<< 기존 단가 값 설정
    priceInput.oninput = () => calculateQuoteRowTotal(newRow);
    priceCell.appendChild(priceInput);

    // 금액 (계산 결과 표시)
    const amountCell = newRow.insertCell(6);
    const amountSpan = document.createElement('span');
    amountSpan.textContent = (quantity * unitPrice).toLocaleString(); // 초기 금액 계산
    amountCell.appendChild(amountSpan);
    // calculateQuoteRowTotal(newRow); // 여기서 또 호출할 필요 없음 (위에서 이미 계산)

    // 관리 (삭제 버튼)
    const actionCell = newRow.insertCell(7);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.type = 'button';
    deleteButton.classList.add('logout-button');
    deleteButton.style.padding = '3px 8px';
    deleteButton.onclick = () => deleteQuoteItemRow(deleteButton);
    actionCell.appendChild(deleteButton);

    // 주의: 이 함수는 calculateQuoteTotal()을 직접 호출하지 않습니다.
    // openEditQuoteModal에서 모든 행이 추가된 후 마지막에 한 번만 호출합니다.
}

function editQuote(quoteId) { alert(`Edit Quote ${quoteId} needed`); }
function deleteQuote(quoteId) { if(confirm(`Delete Quote ${quoteId}?`)) alert('Quote Delete needed'); }
function printQuote() { alert('견적서 인쇄 기능 구현 필요'); }
function searchOrders() { alert('주문 검색 기능 구현 필요'); }
function viewOrderDetails(orderId) { alert(`View Order ${orderId} details needed`); }
function editOrder(orderId) { alert(`Edit Order ${orderId} needed`); }
function cancelOrder(orderId) { if(confirm(`Cancel Order ${orderId}?`)) alert('Order Cancel needed'); }
function printOrder() { alert('주문서 인쇄 기능 구현 필요'); }
function searchSuppliers() { alert('공급처 검색 기능 구현 필요'); }
function viewSupplierDetails(supplierId) { alert(`View Supplier ${supplierId} details needed`); }
function openEvaluateSupplierModal(supplierId) { alert(`Evaluate Supplier ${supplierId} modal needed`); }
function goToPartnerManagement() {
    console.log("Navigating to Partner Management...");
    const partnerMgmtLink = document.querySelector('.sidebar nav a[href="#partner-mgmt"]');
    if (partnerMgmtLink) {
        partnerMgmtLink.click();
    } else {
        console.error("Could not find the Partner Management link");
        alert("거래처 관리 메뉴 링크를 찾을 수 없습니다.");
    }
}
function searchEvaluationForms() { alert('평가 양식 검색 기능 구현 필요'); }
function openManageCriteriaModal(formId) { alert(`Manage Criteria for Form ${formId} needed`); }
function editEvaluationForm(formId) { alert(`Edit Evaluation Form ${formId} needed`); }
function deleteEvaluationForm(formId) { if(confirm(`Delete Form ${formId}?`)) alert('Eval Form Delete needed'); }
function addEvaluationCategoryRow() { alert('Add Category Row needed'); }
function saveEvaluationCriteria() { alert('Save Criteria needed'); }
function showDirectWriteView() { alert('Show Direct Write View needed'); }
function showImportTemplateView() { alert('Show Import Template View needed'); }
function resetAndShowChoice(modalId) { alert('Reset and Show Choice needed'); }
function loadTemplateOptions(docType) { alert('Load Template Options needed'); }
function loadTemplate() { alert('Load Template needed'); }
function toggleRelevantDepartments(prefix) { alert('Toggle Relevant Depts needed'); }
function openTask(taskId) { alert(`Open Task ${taskId} details needed`); }
function createDocumentFromFavorite(templateId) { alert(`Create document from template ${templateId} needed`); }

function navigateToSection(targetId, params = {}) {
    console.log(`Navigating to: ${targetId}`);
    // 모든 섹션 숨기기
    document.querySelectorAll('.main-content section').forEach(section => {
        section.style.display = 'none';
    });

    // 대상 섹션 표시 (ID가 '-view'로 끝난다고 가정)
    const targetSection = document.getElementById(targetId + '-view');
    if (targetSection) {
        targetSection.style.display = 'block';
        console.log(`Section ${targetId}-view displayed.`);

        // --- 중요: 섹션별 데이터 로딩/표시 로직 ---
        if (targetId === 'quote-mgmt') {
            console.log(">>> navigateToSection: displayQuotes 호출 직전 sampleQuotes 상태:", JSON.stringify(sampleQuotes.map(q => ({id: q.id, status: q.status}))));
            displayQuotes(sampleQuotes); // 견적 목록 표시 함수 호출
        } else if (targetId === 'order-mgmt') {
            console.log("주문 관리 섹션 활성화됨. 주문 목록 표시.");
            displayOrders(sampleOrders); // <<< 주문 목록 표시 함수 호출 추가!
        } else if (targetId === 'item-mgmt') {
            // displayItems(items); // 예: 품목 관리
        } // ... 다른 섹션 로드 시 필요한 함수 호출 추가 ...
        // --- ---

    } else {
        console.error(`Target section view not found for id: ${targetId}-view`);
        // document.getElementById('dashboard-overview-view').style.display = 'block'; // 기본 화면 표시
    }

    // 사이드바 메뉴 활성 상태 업데이트
    updateSidebarActiveState(targetId); // (이 함수가 있다고 가정)
}

// 사이드바 업데이트 함수 (예시, 이미 있다면 수정 불필요)
function updateSidebarActiveState(targetId) {
    document.querySelectorAll('.sidebar nav a').forEach(link => {
        link.classList.remove('active');
        // href 속성에서 # 제거하고 비교
        if (link.getAttribute('href') === `#${targetId}`) {
            link.classList.add('active');
            // 상위 메뉴도 활성화 (만약 접혀있다면 펼치기 등)
            const parentLi = link.closest('li');
            const parentUl = parentLi ? parentLi.closest('ul') : null;
            const parentLink = parentUl && parentUl.previousElementSibling && parentUl.previousElementSibling.tagName === 'A' ? parentUl.previousElementSibling : null;
            if(parentLink) {
                 parentLink.classList.add('active'); // 상위 링크 활성화
                 // 만약 하위 메뉴가 닫혀 있다면 펼치는 로직 추가 가능
            }
        }
    });
}

// --- User Management Functions ---
function renderUserList(userList) { /* ... existing code ... */ }
function searchUsers() { /* ... existing code ... */ }
function editUser(userId) { /* ... existing code ... */ }
function deleteUser(userId) { /* ... existing code ... */ }
function viewUserDetails(id) { alert(`User ${id} details view needed.`); }

// --- Partner Management Functions ---
function renderPartnerList(partnerList) { /* ... existing code ... */ }
function viewPartnerDetails(partnerId) { /* ... existing code ... */ }
function editPartner(partnerId) { /* ... existing code ... */ }
function deletePartner(partnerId) { /* ... existing code ... */ }

// --- Customer Management Functions ---
function renderCustomerList(customerList) { /* ... existing code ... */ }
function searchCustomers() { /* ... existing code ... */ }
function viewCustomerDetails(customerId) { alert(`View Customer ${customerId} details needed`); }
function editCustomer(customerId) { alert(`Edit Customer ${customerId} needed`); }
function deleteCustomer(customerId) { if(confirm(`Delete Customer ${customerId}?`)) alert('Customer Delete needed'); }

// --- Company Management Functions ---
function displayCompanyInfo() { /* ... existing code ... */ }
function populateEditCompanyForm() { /* ... existing code ... */ }

// --- Helper Functions ---
function calculateNextCalibrationDate(lastCalDateStr, cycleStr) { /* ... existing code ... */ }
function updateDashboardTodoList() { /* ... existing code ... */ }
function getCurrentUserId() { /* ... existing code ... */ }
function getCurrentUserDepartment() { /* ... existing code ... */ }

// --- 견적 품목 검색 및 추가 관련 함수들 ---

// 검색 모달에서 '검색' 버튼 클릭 시 실행될 함수
function searchQuoteItems() {
    const searchInput = document.getElementById('quote-item-search-input');
    const resultsBody = document.getElementById('quote-item-search-results');
    if (!searchInput || !resultsBody) return;

    const searchTerm = searchInput.value.toLowerCase();
    resultsBody.innerHTML = ''; // 이전 결과 지우기

    // 품목(items) 배열에서 필터링: 제품(Product)만, 코드 또는 이름 포함
    const filteredItems = items.filter(item =>
        item.itemType === 'Product' &&
        (item.itemCode.toLowerCase().includes(searchTerm) || item.itemName.toLowerCase().includes(searchTerm))
    );

    if (filteredItems.length === 0) {
        resultsBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">검색 결과가 없습니다.</td></tr>';
        return;
    }

    // 검색 결과를 테이블에 행으로 추가
    filteredItems.forEach(item => {
        const row = resultsBody.insertRow();
        row.insertCell(0).textContent = item.itemCode;
        row.insertCell(1).textContent = item.itemName;
        row.insertCell(2).textContent = item.itemSpec || '-';
        row.insertCell(3).textContent = item.itemUnit;
        row.insertCell(4).textContent = item.sellingPrice ? item.sellingPrice.toLocaleString() : '-'; // 판매 단가

        // '선택' 버튼 추가
        const actionCell = row.insertCell(5);
        const selectBtn = document.createElement('button');
        selectBtn.textContent = '선택';
        selectBtn.classList.add('view-button'); // 기존 버튼 스타일 활용
        // 선택 버튼 클릭 시 selectQuoteItem 함수 호출 (품목 ID 전달)
        selectBtn.onclick = () => selectQuoteItem(item.id);
        actionCell.appendChild(selectBtn);
    });
}

// 검색 모달에서 품목 '선택' 버튼 클릭 시 실행될 함수
function selectQuoteItem(selectedItemId) {
    const selectedItem = items.find(i => i.id === selectedItemId);
    if (!selectedItem) {
        alert("선택한 품목 정보를 찾을 수 없습니다.");
        return;
    }

    // 견적 모달의 품목 테이블에 행 추가 (addQuoteItemRow 함수 활용)
    addQuoteItemRow(selectedItem);

    // 검색 모달 닫기
    closeModal('quote-item-search-modal');
}

// 견적 모달 테이블에 행 추가하는 함수 (선택된 품목 정보로 채우도록 수정)
let quoteNextRowIndex = 1; // 견적 품목 테이블 행 번호용 전역 변수 (필요시 적절한 위치로 이동)

function addQuoteItemRow(item = null) { // item 파라미터 추가
    const tableBody = document.getElementById('quote-items-table-body');
    if (!tableBody) return;

    const newRow = tableBody.insertRow();
    const currentItemIndex = tableBody.rows.length; // 현재 행 번호 (1부터 시작하도록 조정 가능)
    // quoteNextRowIndex++; // 또는 전역 변수 사용

    // No
    newRow.insertCell(0).textContent = currentItemIndex;

    // 품목 (선택된 정보 또는 입력 필드)
    const itemCell = newRow.insertCell(1);
    itemCell.textContent = item ? item.itemName : '선택된 품목 없음'; // 선택된 경우 이름 표시
    // 숨겨진 input에 품목 ID 저장 (나중에 저장 시 사용)
    const itemIdInput = document.createElement('input');
    itemIdInput.type = 'hidden';
    itemIdInput.name = `items[${currentItemIndex-1}][itemId]`; // 저장 시 배열 형태로 보내기 위함 (index는 0부터)
    itemIdInput.value = item ? item.id : '';
    itemCell.appendChild(itemIdInput);
    // 만약 직접 입력도 가능하게 하려면 input 필드 추가

    // 규격
    newRow.insertCell(2).textContent = item ? (item.itemSpec || '-') : '-';
    // 단위
    newRow.insertCell(3).textContent = item ? item.itemUnit : '-';

    // 수량 (입력 필드)
    const qtyCell = newRow.insertCell(4);
    const qtyInput = document.createElement('input');
    qtyInput.type = 'number';
    qtyInput.name = `items[${currentItemIndex-1}][quantity]`;
    qtyInput.min = '1';
    qtyInput.step = '1';
    qtyInput.style.width = '90%';
    qtyInput.required = true;
    qtyInput.value = 1; // 기본값 1
    qtyInput.oninput = () => calculateQuoteRowTotal(newRow); // 수량 변경 시 금액 다시 계산
    qtyCell.appendChild(qtyInput);

    // 단가 (선택된 정보 또는 입력 필드)
    const priceCell = newRow.insertCell(5);
    const priceInput = document.createElement('input');
    priceInput.type = 'number';
    priceInput.name = `items[${currentItemIndex-1}][unitPrice]`;
    priceInput.min = '0';
    priceInput.step = 'any'; // 소수점 허용
    priceInput.style.width = '95%';
    priceInput.required = true;
    priceInput.value = item ? (item.sellingPrice || 0) : 0; // 선택된 품목 판매가 반영
    priceInput.oninput = () => calculateQuoteRowTotal(newRow); // 단가 변경 시 금액 다시 계산
    priceCell.appendChild(priceInput);

    // 금액 (계산 결과 표시, 읽기 전용)
    const amountCell = newRow.insertCell(6);
    const amountSpan = document.createElement('span');
    amountSpan.textContent = '0'; // 초기값
    amountCell.appendChild(amountSpan);
    calculateQuoteRowTotal(newRow); // 초기 금액 계산

    // 관리 (삭제 버튼)
    const actionCell = newRow.insertCell(7);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.type = 'button'; // form 제출 방지
    deleteButton.classList.add('logout-button');
    deleteButton.style.padding = '3px 8px';
    deleteButton.onclick = () => deleteQuoteItemRow(deleteButton);
    actionCell.appendChild(deleteButton);

    // 총액 업데이트
    calculateQuoteTotal();
}

// 견적 품목 테이블의 특정 행 삭제 함수
function deleteQuoteItemRow(buttonElement) {
    const row = buttonElement.closest('tr');
    if (row) {
        row.remove();
        // 행 번호 재정렬 등 추가 로직 필요시 구현
        calculateQuoteTotal(); // 총액 다시 계산
    }
}

// 견적 품목 테이블의 특정 행 금액 계산 함수
function calculateQuoteRowTotal(row) {
    const qtyInput = row.cells[4].querySelector('input');
    const priceInput = row.cells[5].querySelector('input');
    const amountSpan = row.cells[6].querySelector('span');

    const quantity = parseFloat(qtyInput.value) || 0;
    const unitPrice = parseFloat(priceInput.value) || 0;
    const amount = quantity * unitPrice;

    amountSpan.textContent = amount.toLocaleString(); // 계산된 금액 표시 (콤마 추가)
    calculateQuoteTotal(); // 행 금액 변경 시 전체 총액 다시 계산
}

// 견적 전체 총액 계산 함수
function calculateQuoteTotal() {
    const tableBody = document.getElementById('quote-items-table-body');
    const rows = tableBody.querySelectorAll('tr');
    let totalAmount = 0;

    rows.forEach(row => {
        const qtyInput = row.cells[4].querySelector('input');
        const priceInput = row.cells[5].querySelector('input');
        const quantity = parseFloat(qtyInput.value) || 0;
        const unitPrice = parseFloat(priceInput.value) || 0;
        totalAmount += quantity * unitPrice;
    });

    const totalAmountInput = document.getElementById('add-quote-total-amount');
    if (totalAmountInput) {
        totalAmountInput.value = totalAmount.toLocaleString(); // 총액 표시 (콤마 추가)
    }
}

// 견적 데이터를 테이블에 표시하는 함수
function displayQuotes(quotes) {
    // ★★★ 1번 로그: 함수 시작 시점 확인 ★★★
    console.log(">>> displayQuotes 시작. 전달받은 데이터 상태:", JSON.stringify(quotes.map(q => ({id: q.id, status: q.status}))));

    const quoteTableBody = document.getElementById('quote-table-body');
    if (!quoteTableBody) {
         console.error("견적 테이블 tbody 요소를 찾을 수 없습니다.");
         return;
    }
    quoteTableBody.innerHTML = ''; // 테이블 내용 초기화

    // --- 필터링 로직 ---
    const displayableQuotes = quotes.filter(quote => quote.status !== 'Converted');
    // --- 필터링 로직 끝 ---

    // ★★★ 2번 로그: 필터링 후 결과 확인 (올바른 변수 사용) ★★★
    console.log(">>> displayQuotes 필터링 후. 표시될 데이터 상태:", JSON.stringify(displayableQuotes.map(q => ({id: q.id, status: q.status}))));

    // 중복되고 잘못된 변수 이름을 사용한 로그는 삭제했습니다.

    if (!displayableQuotes || displayableQuotes.length === 0) { // <<< 필터링된 결과 확인
      const emptyRow = quoteTableBody.insertRow();
      const emptyCell = emptyRow.insertCell();
      emptyCell.colSpan = 9; // 테이블 컬럼 수에 맞게 조절
      emptyCell.textContent = '표시할 견적 데이터가 없습니다.';
      emptyCell.style.textAlign = 'center';
      return;
    }

    // 필터링된 견적만으로 테이블 생성
    displayableQuotes.forEach((quote, index) => { // <<< 필터링된 결과 사용
      const row = quoteTableBody.insertRow();

      row.insertCell().textContent = index + 1; // No (순번)
      row.insertCell().textContent = quote.quoteNumber;
      row.insertCell().textContent = quote.customerName;
      row.insertCell().textContent = quote.quoteDate;
      row.insertCell().textContent = quote.expiryDate;

      const totalAmountCell = row.insertCell();
      totalAmountCell.textContent = quote.totalAmount ? quote.totalAmount.toLocaleString() : '-'; // 총액 (없을 경우 대비)
      totalAmountCell.style.textAlign = 'right';

      row.insertCell().textContent = quote.statusText || quote.status; // 상태 텍스트 (없으면 status 코드)
      row.insertCell().textContent = quote.authorName;

      const actionsCell = row.insertCell();
      actionsCell.innerHTML = `
        <button class="view-button" onclick="viewQuoteDetails('${quote.id}')">상세</button>
        <button class="edit-button" onclick="openEditQuoteModal('${quote.id}')">수정</button>
        <button class="delete-button" onclick="deleteQuote('${quote.id}')">삭제</button>
        <button class="convert-order-button" onclick="convertToOrderFromList('${quote.id}')">주문전환</button>
      `;
    });
}

// 견적모달 상세에서 주문으로 전환 함수
function populateAndOpenOrderModalFromQuote(quote) {
    if (!quote) {
        alert("주문으로 전환할 견적 데이터가 없습니다.");
        return;
    }

    // === 요소 가져오기 및 개별 확인 ===
    let missingElementId = null;
    const elementsToFind = [
        'add-order-modal', 'order-modal-title', 'edit-order-id', 'add-order-date',
        'add-order-delivery-date', 'add-order-customer-name', 'add-order-customer-id',
        'add-order-rep-name', 'add-order-rep-id', 'add-order-source-quote-number',
        'add-order-source-quote-id', 'add-order-status-display', 'add-order-status',
        'add-order-notes', 'order-items-table-body', 'add-order-total-amount'
    ];
    const elements = {}; // 찾은 요소들을 저장할 객체

    for (const id of elementsToFind) {
        elements[id] = document.getElementById(id);
        if (!elements[id]) {
            missingElementId = id; // 요소를 찾지 못하면 ID 기록하고 중단
            break;
        }
    }

    // 만약 누락된 요소가 있다면 에러 메시지 표시 후 종료
    if (missingElementId) {
        const errorMsg = `주문 등록 모달 필수 요소 누락: ID '${missingElementId}' 요소를 찾을 수 없습니다. index.html 파일을 확인하세요.`;
        alert(errorMsg); // 사용자에게 알림
        console.error(errorMsg); // 개발자 콘솔에 에러 기록
        return; // 함수 실행 중단
    }
    // ==================================

    // 모든 요소를 찾았다면, 여기서부터 로직 계속 진행
    console.log("모든 주문 등록 모달 요소 확인 완료.");

    // 이제 elements 객체를 사용하여 요소에 접근합니다. (예: elements['order-modal-title'])
    elements['order-modal-title'].textContent = "신규 주문 등록 (견적 기반)";
    elements['edit-order-id'].value = ''; // 신규 등록

    const today = new Date().toISOString().split('T')[0];
    elements['add-order-date'].value = today;
    elements['add-order-delivery-date'].value = '';

    elements['add-order-customer-name'].value = quote.customerName || '';
    // elements['add-order-customer-id'].value = quote.customerId || ''; // ID가 있다면

    elements['add-order-rep-name'].value = quote.authorName || '';
    // elements['add-order-rep-id'].value = quote.authorId || ''; // ID가 있다면

    elements['add-order-source-quote-number'].value = quote.quoteNumber || '';
    elements['add-order-source-quote-id'].value = quote.id || '';

    elements['add-order-status-display'].value = "접수 대기";
    elements['add-order-status'].value = "Pending";

    elements['add-order-notes'].value = quote.notes || '';

    // 주문 품목 테이블 채우기
    const orderItemsTableBody = elements['order-items-table-body']; // elements 객체에서 가져옴
    orderItemsTableBody.innerHTML = '';
    if (quote.items && quote.items.length > 0) {
        quote.items.forEach(quoteItem => {
            const itemInfo = items.find(i => i.id === quoteItem.itemId);
            if (itemInfo) {
                addOrderItemRowWithData(itemInfo, quoteItem.quantity, quoteItem.unitPrice);
            } else {
                 console.warn(`주문 전환 중: 견적 품목 ID '${quoteItem.itemId}' 정보를 찾을 수 없음.`);
            }
        });
    }

    // 주문 총액 계산
    calculateOrderTotal(); // 이 함수 내부에서도 'order-items-table-body'와 'add-order-total-amount' ID를 사용

    // 모달 열기
    openModal('add-order-modal');
    console.log("주문 등록 모달 표시 완료 (견적 데이터 기반).");
}

/**
 * 견적 상세 모달의 "주문으로 전환" 버튼 클릭 시 실행되는 함수
 * - 주문 등록 모달을 띄우지 않고 바로 주문 생성 및 화면 이동
 */
function convertToOrder() {
    // 1. 현재 열려있는 상세 모달에서 저장된 견적 ID 가져오기
    const detailsModal = document.getElementById('view-quote-details-modal');
    const quoteId = detailsModal ? detailsModal.getAttribute('data-current-quote-id') : null;

    if (!quoteId) {
        alert("현재 견적 ID를 찾을 수 없습니다. 상세 모달을 다시 열어주세요.");
        console.error("상세 모달에서 'data-current-quote-id' 속성을 찾을 수 없음.");
        return;
    }

    console.log(`상세 모달에서 주문 전환 시작 (Quote ID: ${quoteId})`);

    // 2. 해당 견적 데이터 찾기
    const quote = sampleQuotes.find(q => q.id === quoteId);
    if (!quote) {
        alert("주문으로 전환할 견적 정보를 찾을 수 없습니다.");
        console.error(`ID '${quoteId}'에 해당하는 견적을 sampleQuotes에서 찾지 못했습니다.`);
        return;
    }

    // --- (선택 사항) 견적 상태 확인 ---
    if (quote.status === 'Converted') {
         alert("이미 주문으로 전환된 견적입니다.");
         closeModal('view-quote-details-modal'); // 확인 후 모달 닫기
         return;
    }
    // -------------------------------

    // 3. 현재 열려있는 상세 모달 닫기
    closeModal('view-quote-details-modal');

    // 4. 새로운 주문 데이터 객체 생성
    const today = new Date().toISOString().split('T')[0];
    const newOrderId = `ORD-${today.replace(/-/g,'')}-${nextOrderIdCounter++}`; // 예: ORD20250425-1

    const newOrder = {
        id: newOrderId,
        orderNumber: newOrderId,
        orderDate: today,
        requestedDeliveryDate: '', // 납기요청일은 비워두거나 기본값 설정 (예: 7일 뒤)
        customerName: quote.customerName,
        // customerId: quote.customerId, // ID가 있다면 복사
        representativeName: quote.authorName, // 담당자 정보 (필요시 수정)
        // representativeUserId: quote.authorId, // ID가 있다면 복사
        sourceQuoteId: quote.id,
        sourceQuoteNumber: quote.quoteNumber,
        totalAmount: quote.totalAmount, // 견적 금액 그대로 사용
        orderStatus: 'Pending', // 초기 상태: 접수 대기
        orderStatusText: '접수 대기',
        notes: `견적 ${quote.quoteNumber} 에서 자동 전환됨.\n${quote.notes || ''}`,
        items: quote.items.map(item => ({ // 품목 정보 깊은 복사
            itemId: item.itemId,
            quantity: item.quantity,
            unitPrice: item.unitPrice
        }))
    };

    // 5. 생성된 주문 데이터를 sampleOrders 배열에 추가 ("저장")
    sampleOrders.push(newOrder);
    console.log("새로운 주문 데이터 생성 및 추가 완료:", newOrder);

    // 6. 원본 견적 상태 변경
    const originalQuoteIndex = sampleQuotes.findIndex(q => q.id === quoteId);
    if (originalQuoteIndex !== -1) {
        sampleQuotes[originalQuoteIndex].status = 'Converted';
        sampleQuotes[originalQuoteIndex].statusText = '주문됨';
        console.log(`견적 ${quoteId}의 상태를 'Converted'로 변경했습니다.`);
    } else {
        console.warn(`상태를 변경할 원본 견적 ${quoteId}를 찾지 못했습니다.`);
    }

    // 7. 사용자에게 성공 메시지 표시
    alert(`견적 ${quote.quoteNumber} 가 주문 ${newOrder.orderNumber} 로 성공적으로 전환되었습니다!`);

    // 8. 주문 관리 화면으로 이동 및 목록 새로고침
    navigateToSection('order-mgmt');
}

/**
 * 견적 목록의 "주문전환" 버튼 클릭 시 실행되는 함수
 * - 주문 등록 모달을 띄우지 않고 바로 주문 생성 및 화면 이동
 * - (기존 로직에서 원본 견적 상태 변경 추가)
 */
function convertToOrderFromList(quoteId) {
    console.log(`리스트에서 견적 ${quoteId} 를 주문으로 직접 생성 시작`);

    // 1. 원본 견적 데이터 찾기
    const quote = sampleQuotes.find(q => q.id === quoteId);
    if (!quote) {
        alert("주문으로 전환할 원본 견적 정보를 찾을 수 없습니다.");
        console.error(`ID '${quoteId}'에 해당하는 견적을 sampleQuotes에서 찾지 못했습니다.`);
        return;
    }

    // --- (선택 사항) 견적 상태 확인 ---
    if (quote.status === 'Converted') {
         alert("이미 주문으로 전환된 견적입니다.");
         return; // 이미 전환되었으면 중단
    }
    // -------------------------------

    // 2. 새로운 주문 데이터 객체 생성 (convertToOrder와 동일한 로직 사용)
    const today = new Date().toISOString().split('T')[0];
    const newOrderId = `ORD-${today.replace(/-/g,'')}-${nextOrderIdCounter++}`;

    const newOrder = {
        id: newOrderId,
        orderNumber: newOrderId,
        orderDate: today,
        requestedDeliveryDate: '', // 필요시 기본값 설정
        customerName: quote.customerName,
        // customerId: quote.customerId,
        representativeName: quote.authorName,
        // representativeUserId: quote.authorId,
        sourceQuoteId: quote.id,
        sourceQuoteNumber: quote.quoteNumber,
        totalAmount: quote.totalAmount,
        orderStatus: 'Pending',
        orderStatusText: '접수 대기',
        notes: `견적 ${quote.quoteNumber} 에서 자동 전환됨.\n${quote.notes || ''}`,
        items: quote.items.map(item => ({
            itemId: item.itemId,
            quantity: item.quantity,
            unitPrice: item.unitPrice
        }))
    };

    // 3. 생성된 주문 데이터를 sampleOrders 배열에 추가 ("저장")
    sampleOrders.push(newOrder);
    console.log("새로운 주문 데이터 생성 및 추가 완료:", newOrder);

    // ★★★ 4. 원본 견적 상태 변경 (추가된 로직) ★★★
    const originalQuoteIndex = sampleQuotes.findIndex(q => q.id === quoteId);
    if (originalQuoteIndex !== -1) {
        sampleQuotes[originalQuoteIndex].status = 'Converted';
        sampleQuotes[originalQuoteIndex].statusText = '주문됨';
        console.log(`견적 ${quoteId}의 상태를 'Converted'로 변경했습니다.`);
        // 견적 목록 화면을 즉시 새로고침 (선택 사항)
        // displayQuotes(sampleQuotes); // 현재 화면이 견적 목록이므로 바로 갱신
    } else {
        console.warn(`상태를 변경할 원본 견적 ${quoteId}를 찾지 못했습니다.`);
    }

    // 5. 사용자에게 성공 메시지 표시
    alert(`견적 ${quote.quoteNumber} 가 주문 ${newOrder.orderNumber} 로 성공적으로 전환되었습니다!`);

    // 6. 주문 관리 화면으로 이동
    navigateToSection('order-mgmt');
}

/**
 * 견적 데이터를 테이블에 표시하는 함수
 * - 상태가 'Converted'인 견적은 제외하도록 필터링 추가
 */
function displayQuotes(quotes) {
    // ★★★ 로그 1: 함수 시작 시점 확인 ★★★
    console.log(">>> displayQuotes 시작. 전달받은 데이터 상태:", JSON.stringify(quotes.map(q => ({id: q.id, status: q.status}))));

    const quoteTableBody = document.getElementById('quote-table-body');
    if (!quoteTableBody) {
         console.error("견적 테이블 tbody 요소를 찾을 수 없습니다.");
         return;
    }
    quoteTableBody.innerHTML = ''; // 테이블 내용 초기화

    // --- 필터링 로직 ---
    const displayableQuotes = quotes.filter(quote => quote.status !== 'Converted');
    // --- 필터링 로직 끝 ---

    // ★★★ 로그 2: 필터링 후 결과 확인 ★★★
    console.log(">>> displayQuotes 필터링 후. 표시될 데이터 상태:", JSON.stringify(displayableQuotes.map(q => ({id: q.id, status: q.status}))));

    // 필터링된 결과가 없는 경우 확인
    if (!displayableQuotes || displayableQuotes.length === 0) {
      const emptyRow = quoteTableBody.insertRow();
      const emptyCell = emptyRow.insertCell();
      emptyCell.colSpan = 9; // 테이블 컬럼 수에 맞게 조절
      emptyCell.textContent = '표시할 견적 데이터가 없습니다.';
      emptyCell.style.textAlign = 'center';
      // ★★★ 로그 3: 데이터 없음 확인 ★★★
      console.log(">>> displayQuotes: 필터링 후 데이터 없음, '데이터 없음' 표시.");
      return; // 데이터 없으면 여기서 함수 종료
    }

    // 필터링된 견적만으로 테이블 생성
    displayableQuotes.forEach((quote, index) => { // <<< 필터링된 결과 사용
        // ★★★ 로그 4: 실제로 어떤 행이 그려지는지 확인 ★★★
        console.log(`>>> displayQuotes 루프: 행 그리는 중 - ID: ${quote.id}, 상태: ${quote.status}`);

        const row = quoteTableBody.insertRow();
        // ... (행 내용 채우기) ...
        row.insertCell().textContent = index + 1;
        row.insertCell().textContent = quote.quoteNumber;
        row.insertCell().textContent = quote.customerName;
        row.insertCell().textContent = quote.quoteDate;
        row.insertCell().textContent = quote.expiryDate;
        const totalAmountCell = row.insertCell();
        totalAmountCell.textContent = quote.totalAmount ? quote.totalAmount.toLocaleString() : '-';
        totalAmountCell.style.textAlign = 'right';
        row.insertCell().textContent = quote.statusText || quote.status;
        row.insertCell().textContent = quote.authorName;
        const actionsCell = row.insertCell();
        actionsCell.innerHTML = `
          <button class="view-button" onclick="viewQuoteDetails('${quote.id}')">상세</button>
          <button class="edit-button" onclick="openEditQuoteModal('${quote.id}')">수정</button>
          <button class="delete-button" onclick="deleteQuote('${quote.id}')">삭제</button>
          <button class="convert-order-button" onclick="convertToOrderFromList('${quote.id}')">주문전환</button>
        `;
    });
}

/**
 * 특정 섹션으로 이동하고 해당 섹션의 데이터를 로드/표시하는 함수
 * - order-mgmt 이동 시 displayOrders 호출 확인
 */
function navigateToSection(targetId, params = {}) {
    console.log(`Navigating to: ${targetId}`);
    document.querySelectorAll('.main-content section').forEach(section => {
        section.style.display = 'none';
    });

    const targetSection = document.getElementById(targetId + '-view');
    if (targetSection) {
        targetSection.style.display = 'block';
        console.log(`Section ${targetId}-view displayed.`);

        if (targetId === 'quote-mgmt') {
            // ★★★ 로그 추가 ★★★
            console.log(">>> navigateToSection: displayQuotes 호출 직전 sampleQuotes 상태:", JSON.stringify(sampleQuotes.map(q => ({id: q.id, status: q.status}))));
            displayQuotes(sampleQuotes);
        } else if (targetId === 'order-mgmt') {
            displayOrders(sampleOrders);
        }
        // ... (다른 섹션) ...
    } else {
        console.error(`Target section view not found for id: ${targetId}-view`);
    }
    updateSidebarActiveState(targetId);
}

// --- 이전에 제공된 다른 함수들 ---
// displayOrders(orders) 함수는 이전에 제공된 코드에 있어야 합니다.
// openModal, closeModal, updateSidebarActiveState 등 다른 함수들도 필요합니다.

/**
 * 주문 모달 테이블에 데이터와 함께 행 추가하는 함수
 * @param {object} item - 품목 정보 객체 (items 배열의 요소)
 * @param {number} quantity - 주문 수량
 * @param {number} unitPrice - 주문 단가
 */
function addOrderItemRowWithData(item, quantity, unitPrice) {
    const tableBody = document.getElementById('order-items-table-body'); // 주문 테이블 tbody ID
    if (!tableBody) {
        console.error("[addOrderItemRowWithData] 에러: order-items-table-body 요소를 찾을 수 없음!");
        return;
    }

    const newRow = tableBody.insertRow();
    const currentItemIndex = tableBody.rows.length;

    newRow.insertCell(0).textContent = currentItemIndex; // No

    const itemCell = newRow.insertCell(1); // 품목명
    itemCell.textContent = item.itemName;
    const itemIdInput = document.createElement('input');
    itemIdInput.type = 'hidden';
    itemIdInput.name = `orderItems[${currentItemIndex-1}][itemId]`; // 폼 제출 시 사용될 이름
    itemIdInput.value = item.id;
    itemCell.appendChild(itemIdInput);

    newRow.insertCell(2).textContent = item.itemSpec || '-'; // 규격
    newRow.insertCell(3).textContent = item.itemUnit; // 단위

    const qtyCell = newRow.insertCell(4); // 수량
    const qtyInput = document.createElement('input');
    qtyInput.type = 'number';
    qtyInput.name = `orderItems[${currentItemIndex-1}][quantity]`;
    qtyInput.min = '1';
    qtyInput.step = '1';
    qtyInput.style.width = '90%';
    qtyInput.required = true;
    qtyInput.value = quantity; // 전달받은 수량 설정
    qtyInput.oninput = () => calculateOrderRowTotal(newRow); // 행 금액 다시 계산
    qtyCell.appendChild(qtyInput);

    const priceCell = newRow.insertCell(5); // 단가
    const priceInput = document.createElement('input');
    priceInput.type = 'number';
    priceInput.name = `orderItems[${currentItemIndex-1}][unitPrice]`;
    priceInput.min = '0';
    priceInput.step = 'any';
    priceInput.style.width = '95%';
    priceInput.required = true;
    priceInput.value = unitPrice; // 전달받은 단가 설정
    priceInput.oninput = () => calculateOrderRowTotal(newRow); // 행 금액 다시 계산
    priceCell.appendChild(priceInput);

    const amountCell = newRow.insertCell(6); // 금액
    const amountSpan = document.createElement('span');
    amountSpan.textContent = (quantity * unitPrice).toLocaleString(); // 초기 금액 계산 및 표시
    amountCell.appendChild(amountSpan);

    const actionCell = newRow.insertCell(7); // 관리(삭제)
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.type = 'button'; // 폼 제출 방지
    deleteButton.classList.add('logout-button'); // 또는 다른 삭제 버튼 클래스
    deleteButton.style.padding = '3px 8px';
    deleteButton.onclick = () => deleteOrderItemRow(deleteButton); // 주문 품목 행 삭제 함수 호출
    actionCell.appendChild(deleteButton);
}

/**
 * 주문 품목 테이블의 특정 행 삭제 함수
 * @param {HTMLButtonElement} buttonElement - 클릭된 삭제 버튼 요소
 */
function deleteOrderItemRow(buttonElement) {
    const row = buttonElement.closest('tr');
    if (row) {
        row.remove();
        calculateOrderTotal(); // 삭제 후 총액 다시 계산
    }
}

/**
 * 주문 품목 테이블의 특정 행 금액 계산 함수
 * @param {HTMLTableRowElement} row - 계산할 행 요소
 */
function calculateOrderRowTotal(row) {
    const qtyInput = row.cells[4].querySelector('input');
    const priceInput = row.cells[5].querySelector('input');
    const amountSpan = row.cells[6].querySelector('span');
    const quantity = parseFloat(qtyInput.value) || 0;
    const unitPrice = parseFloat(priceInput.value) || 0;
    const amount = quantity * unitPrice;
    amountSpan.textContent = amount.toLocaleString();
    calculateOrderTotal(); // 행 금액 변경 시 전체 총액 다시 계산
}

/**
 * 주문 전체 총액 계산 및 표시 함수
 */
function calculateOrderTotal() {
    const tableBody = document.getElementById('order-items-table-body');
    const rows = tableBody.querySelectorAll('tr');
    let totalAmount = 0;
    rows.forEach(row => {
        const qtyInput = row.cells[4].querySelector('input');
        const priceInput = row.cells[5].querySelector('input');
        const quantity = parseFloat(qtyInput.value) || 0;
        const unitPrice = parseFloat(priceInput.value) || 0;
        totalAmount += quantity * unitPrice;
    });
    const totalAmountInput = document.getElementById('add-order-total-amount'); // 주문 총액 필드 ID
    if (totalAmountInput) {
        totalAmountInput.value = totalAmount.toLocaleString();
    }
}

// <<< initializeApp 함수 정의 >>>
function initializeApp() {
    console.log("[Init] initializeApp started");

    // --- 초기 UI 업데이트 ---
    updateHeader(); // Header 요소는 이 함수 내에서 찾거나 전역에서 찾되 DOM 로드 후 호출되므로 안전
    displayCompanyInfo(); // 기업 정보 표시
    updateDashboardTodoList(); // 대시보드 할 일 목록 업데이트

    // --- 사이드바 네비게이션 이벤트 리스너 설정 ---
    document.querySelectorAll('.sidebar nav a').forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                event.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId + '-view');
                const parentLi = this.closest('li');
                const isParentLink = parentLi && parentLi.querySelector('ul');

                if (isParentLink) {
                    this.classList.toggle('active');
                } else if (targetSection) {
                    document.querySelectorAll('.sidebar nav a').forEach(a => a.classList.remove('active'));
                    this.classList.add('active');
                    const parentUl = this.closest('ul');
                    if (parentUl && parentUl.previousElementSibling && parentUl.previousElementSibling.tagName === 'A') {
                        parentUl.previousElementSibling.classList.add('active');
                    }
                    document.querySelectorAll('.main-content section').forEach(section => {
                        section.style.display = 'none';
                    });
                    targetSection.style.display = 'block';
                    console.log(`Displayed section: #${targetId}-view`);

                    // 섹션별 데이터 로딩 함수 호출
                    if (targetId === 'user-mgmt') { renderUserList(users); }
                    else if (targetId === 'partner-mgmt') { renderPartnerList(partners); }
                    else if (targetId === 'company-mgmt') { displayCompanyInfo(); } // Already called above, maybe remove duplicate call?
                    else if (targetId === 'item-mgmt') { renderItemList(items); }
                    else if (targetId === 'customer-mgmt') { renderCustomerList(customers); }
                    else if (targetId === 'equipment-mgmt') { searchEquipment(); }
                    else if (targetId === 'inspection-equip-mgmt') { searchInspectionEquipment(); }
                    else if (targetId === 'evaluation-form-mgmt') { console.log("Evaluation Form section needs data loading."); }
                    else if (targetId === 'dashboard-overview') { updateDashboardTodoList(); } // Already called above?
                    // ... other section loads
                } else {
                    console.warn(`No content section found for href: ${href}`);
                    document.querySelectorAll('.main-content section').forEach(section => { section.style.display = 'none'; });
                }
            }
        });
    });
    console.log("[Init] Attached listeners to sidebar links");

    // --- 폼 제출 이벤트 리스너 설정 ---
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (document.getElementById('signup-password').value !== document.getElementById('signup-confirm-password').value) { alert('비밀번호 불일치'); return; }
            console.log('회원가입 폼 제출:', Object.fromEntries(new FormData(this))); alert('회원가입 요청 (서버 연동 필요)'); closeModal('signup-modal');
        });
        console.log("[Init] Attached listener to signup-form");
    } else { console.error("[Init] Signup form not found! Check HTML ID."); }

    const editCompanyForm = document.getElementById('edit-company-form');
    if (editCompanyForm) {
        editCompanyForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            console.log('기업 정보 수정 폼 제출됨:');
            // Update companyData (simplified)
            companyData.companyName = formData.get('companyName');
            companyData.businessRegistrationNumber = formData.get('businessRegistrationNumber');
            companyData.address = formData.get('address');
            companyData.ceoName = formData.get('ceoName');
            companyData.mainProducts = formData.get('mainProducts');
            companyData.phoneNumber = formData.get('phoneNumber');
            companyData.faxNumber = formData.get('faxNumber');
            const sealImageFile = formData.get('sealImage');
            let imageUpdated = false;
            if (sealImageFile && sealImageFile.size > 0) {
                imageUpdated = true;
                const reader = new FileReader();
                reader.onload = function(e) { companyData.sealImageUrl = e.target.result; displayCompanyInfo(); alert('기업 정보 수정됨 (이미지 임시).'); }
                reader.readAsDataURL(sealImageFile);
            }
            closeModal('edit-company-modal');
            if (!imageUpdated) { displayCompanyInfo(); alert('기업 정보 수정됨.'); }
        });
        console.log("[Init] Attached listener to edit-company-form");
    } else { console.error("[Init] Edit company form not found! Check HTML ID."); }

    const addItemForm = document.getElementById('add-item-form');
    if (addItemForm) {
        addItemForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // ... (품목 추가/수정 로직 - from previous submit handler) ...
             const formData = new FormData(this);
             const itemIdToEdit = formData.get('itemIdToEdit');
             // ... rest of logic ...
             saveDataAndUpdateUI(itemData); // Assuming itemData and this func exist
        });
        console.log("[Init] Attached listener to add-item-form");
    } else { console.error("[Init] Add item form not found! Check HTML ID."); }

    const addWorkorderForm = document.getElementById('add-workorder-form');
    if (addWorkorderForm) {
        addWorkorderForm.addEventListener('submit', function(event) {
            event.preventDefault(); const id = document.getElementById('workorder-id').value;
            if (id) { console.log('작업 지시 수정:', Object.fromEntries(new FormData(this))); alert('작업 지시 수정 (서버 연동 필요)'); }
            else { console.log('작업 지시 추가:', Object.fromEntries(new FormData(this))); alert('작업 지시 추가 (서버 연동 필요)'); }
            closeModal('add-workorder-modal');
        });
        console.log("[Init] Attached listener to add-workorder-form");
    } // No error log needed if form might not exist

    const addUserForm = document.getElementById('add-user-form');
    if (addUserForm) {
        addUserForm.addEventListener('submit', function(event) {
             event.preventDefault();
             // ... (인원 추가/수정 로직) ...
             closeModal('add-user-modal');
             renderUserList(users);
        });
        console.log("[Init] Attached listener to add-user-form");
    } // No error log

    const addPartnerForm = document.getElementById('add-partner-form');
    if (addPartnerForm) {
        addPartnerForm.addEventListener('submit', function(event) {
             event.preventDefault();
             // ... (거래처 추가/수정 로직) ...
             closeModal('add-partner-modal');
             renderPartnerList(partners);
        });
        console.log("[Init] Attached listener to add-partner-form");
    } // No error log

    const addEquipmentForm = document.getElementById('add-equipment-form');
    if (addEquipmentForm) {
        addEquipmentForm.addEventListener('submit', function(event) {
             event.preventDefault();
             // ... (설비 추가/수정 로직) ...
        });
        console.log("[Init] Attached listener to add-equipment-form");
    } // No error log

    const addInspectionEquipForm = document.getElementById('add-inspection-equip-form');
    if (addInspectionEquipForm) {
        addInspectionEquipForm.addEventListener('submit', function(event) {
             event.preventDefault();
             // ... (검사장비 추가/수정 로직) ...
        });
        console.log("[Init] Attached listener to add-inspection-equip-form");
    } // No error log

    const addCustomerForm = document.getElementById('add-customer-form');
    if (addCustomerForm) {
        addCustomerForm.addEventListener('submit', function(event) {
             event.preventDefault();
             // ... (고객 추가/수정 로직) ...
             closeModal('add-customer-modal');
             renderCustomerList(customers); // Or searchCustomers()
        });
        console.log("[Init] Attached listener to add-customer-form");
    } // No error log

    // --- 모든 이벤트 리스너 설정 완료 ---

    // Add listener for modal background click (should be outside initializeApp?)
    // Let's keep it here for now, but maybe better globally defined?
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) { closeModal(event.target.id); }
    });
     console.log("[Init] Attached listener for modal background click");

    console.log("[Init] initializeApp finished");
}
// <<< initializeApp 함수 정의 끝 >>>


// --- 파일 맨 아래 ---
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");
    initializeApp();

    const quoteTableBody = document.getElementById('quote-table-body');
  if (quoteTableBody) {
       console.log("견적 테이블(tbody) 발견. 샘플 데이터 표시 시작...");
       displayQuotes(sampleQuotes); // <<< 바로 이 줄을 추가해주세요!
       console.log("샘플 견적 데이터 표시 완료.");
  } else {
       // 만약 페이지를 처음 열었을 때 견적 관리 화면이 아니라면
       // 이 메시지가 나올 수 있습니다. 그럴 경우 메뉴 클릭 시점에 호출해야 합니다.
       console.warn("페이지 로드 시점에는 견적 테이블(tbody)을 찾을 수 없습니다.");
  }
  // --------------------------

}); // DOMContentLoaded 이벤트 리스너 끝