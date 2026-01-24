import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Download, Image, ChevronUp, ChevronDown, X, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import html2canvas from 'html2canvas';

const ProductOptionsEditor = () => {
  const [title, setTitle] = useState('PRODUCT OPTION_제품 옵션');
  const [titleEnabled, setTitleEnabled] = useState(true);
  const [titleBgColor, setTitleBgColor] = useState('#000000');
  const [titleTextColor, setTitleTextColor] = useState('#FFFFFF');
  const [titleAccentColor, setTitleAccentColor] = useState('#FFD700');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [jalnanFont, setJalnanFont] = useState(null);
  const [impactFont, setImpactFont] = useState(null);

  const [options, setOptions] = useState([
    {
      id: 1,
      number: '01',
      numberEnabled: true,
      numberBold: false,
      numberItalic: false,
      numberOutline: false,
      numberOutlineColor: '#FFFFFF',
      numberOutlineWidth: 1,
      title: '옵션명',
      titleBold: false,
      titleItalic: false,
      titleOutline: false,
      titleOutlineColor: '#FFFFFF',
      titleOutlineWidth: 1,
      titleAlign: 'left',
      fontSize: 22,
      numberSize: 28,
      numberColor: '#000000',
      titleColor: '#000000',
      height: 500,
      specsEnabled: false,
      specs: [],
      specsAlign: 'left',
      specsFontSize: 16,
      specsColor: '#535353',
      image: null,
      imagePosition: { x: 50, y: 50, scale: 100 },
      circleOverlay: { enabled: false, image: null, position: { x: 17, y: 18 }, size: { width: 150, height: 150 }, zIndex: 'front', backgroundColor: '#FFFFFF', innerImage: { scale: 100, position: { x: 50, y: 50 } } },
      textBox: { enabled: false, text: '', fontSize: 16, color: '#000000', position: { x: 50, y: 20 }, bold: false, italic: false, outline: false, outlineColor: '#FFFFFF', outlineWidth: 1 },
      circleOverlaysEnabled: false,
      circleOverlays: [],
      textBoxesEnabled: false,
      textBoxes: []
    },
    {
      id: 2,
      number: '02',
      numberEnabled: true,
      numberBold: false,
      numberItalic: false,
      numberOutline: false,
      numberOutlineColor: '#FFFFFF',
      numberOutlineWidth: 1,
      title: '옵션명',
      titleBold: false,
      titleItalic: false,
      titleOutline: false,
      titleOutlineColor: '#FFFFFF',
      titleOutlineWidth: 1,
      titleAlign: 'left',
      fontSize: 22,
      numberSize: 28,
      numberColor: '#000000',
      titleColor: '#000000',
      height: 500,
      specsEnabled: false,
      specs: [],
      specsAlign: 'left',
      specsFontSize: 16,
      specsColor: '#535353',
      image: null,
      imagePosition: { x: 50, y: 50, scale: 100 },
      circleOverlay: { enabled: false, image: null, position: { x: 17, y: 18 }, size: { width: 150, height: 150 }, zIndex: 'front', backgroundColor: '#FFFFFF', innerImage: { scale: 100, position: { x: 50, y: 50 } } },
      textBox: { enabled: false, text: '', fontSize: 16, color: '#000000', position: { x: 50, y: 20 }, bold: false, italic: false, outline: false, outlineColor: '#FFFFFF', outlineWidth: 1 },
      circleOverlaysEnabled: false,
      circleOverlays: [],
      textBoxesEnabled: false,
      textBoxes: []
    }
  ]);

  const [previewMode, setPreviewMode] = useState(false);
  const [dragging, setDragging] = useState(null);

  // 광고 스크립트 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pl28539791.effectivegatecpm.com/e0a030d49075e7508ace9906e2111ed2/invoke.js';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    
    const adContainer = document.getElementById('adsterra-container');
    if (adContainer && !document.getElementById('adsterra-script')) {
      script.id = 'adsterra-script';
      adContainer.appendChild(script);
    }

    return () => {
      // cleanup
      const existingScript = document.getElementById('adsterra-script');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  // 텍스트 테두리 생성 함수
  const generateTextOutline = (color, width) => {
    if (!width || width < 1) return 'none';
    
    const shadows = [];
    for (let x = -width; x <= width; x++) {
      for (let y = -width; y <= width; y++) {
        if (x !== 0 || y !== 0) {
          shadows.push(`${x}px ${y}px 0 ${color}`);
        }
      }
    }
    return shadows.join(', ');
  };

  // 폰트 로딩
  React.useLayoutEffect(() => {
    const fontStyle = `
      @font-face {
        font-family: 'Gmarket Sans';
        font-style: normal;
        font-weight: 700;
        src: local('Gmarket Sans Bold'), local('GmarketSans-Bold'),
        url('http://script.ebay.co.kr/fonts/GmarketSansBold.woff2') format('woff2'),
        url('http://script.ebay.co.kr/fonts/GmarketSansBold.woff') format('woff');
      }
      @font-face {
        font-family: 'Gmarket Sans';
        font-style: normal;
        font-weight: 500;
        src: local('Gmarket Sans Medium'), local('GmarketSans-Medium'),
        url('http://script.ebay.co.kr/fonts/GmarketSansMedium.woff2') format('woff2'),
        url('http://script.ebay.co.kr/fonts/GmarketSansMedium.woff') format('woff');
      }
      @font-face {
        font-family: 'Gmarket Sans';
        font-style: normal;
        font-weight: 300;
        src: local('Gmarket Sans Light'), local('GmarketSans-Light'),
        url('http://script.ebay.co.kr/fonts/GmarketSansLight.woff2') format('woff2'),
        url('http://script.ebay.co.kr/fonts/GmarketSansLight.woff') format('woff');
      }
      ${jalnanFont ? `@font-face {
        font-family: 'Jalnan';
        src: url('${jalnanFont}');
        font-style: normal;
      }` : ''}
      ${impactFont ? `@font-face {
        font-family: 'Impact';
        src: url('${impactFont}');
        font-style: normal;
      }` : ''}
    `;
    
    let styleEl = document.getElementById('custom-fonts');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'custom-fonts';
      document.head.insertBefore(styleEl, document.head.firstChild);
    }
    styleEl.textContent = fontStyle;
    
    // Google Fonts
    let googleLink = document.getElementById('google-fonts-link');
    if (!googleLink) {
      googleLink = document.createElement('link');
      googleLink.id = 'google-fonts-link';
      googleLink.href = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css';
      googleLink.rel = 'stylesheet';
      googleLink.crossOrigin = 'anonymous';
      document.head.appendChild(googleLink);
    }
  }, [jalnanFont, impactFont]);

  const handleTitleFontUpload = (fontType) => (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result;
        if (fontType === 'jalnan') {
          setJalnanFont(base64);
          alert('잘난체가 업로드되었습니다! 미리보기에서 확인하세요.');
        } else if (fontType === 'impact') {
          setImpactFont(base64);
          alert('임팩트 폰트가 업로드되었습니다! 미리보기에서 확인하세요.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (optionId) => (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setOptions(options.map(s => 
          s.id === optionId ? { ...s, image: event.target.result } : s
        ));
      };
      reader.readAsDataURL(file);
    }
    // input 리셋 (같은 파일도 다시 선택 가능하게)
    e.target.value = '';
  };

  const handleCircleImageUpload = (optionId) => (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setOptions(options.map(s => {
          if (s.id === optionId) {
            return { 
              ...s, 
              circleOverlay: { 
                ...s.circleOverlay, 
                image: event.target.result,
                enabled: true,
                innerImage: {
                  scale: 100,
                  position: { x: 50, y: 50 }
                }
              } 
            };
          }
          return s;
        }));
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const deleteImage = (optionId) => {
    setOptions(options.map(o => 
      o.id === optionId ? { ...o, image: null } : o
    ));
  };

  const deleteCircleImage = (optionId) => {
    setOptions(options.map(o => 
      o.id === optionId ? { 
        ...o, 
        circleOverlay: { 
          ...o.circleOverlay, 
          image: null
        } 
      } : o
    ));
  };

  const toggleCircleOverlay = (optionId) => {
    setOptions(options.map(o => {
      if (o.id === optionId) {
        const newEnabled = !o.circleOverlay.enabled;
        return { 
          ...o, 
          circleOverlay: { 
            ...o.circleOverlay, 
            enabled: newEnabled,
            innerImage: o.circleOverlay.innerImage || {
              scale: 100,
              position: { x: 50, y: 50 }
            }
          } 
        };
      }
      return o;
    }));
  };

  const updateCircleOverlay = (optionId, field, value) => {
    setOptions(options.map(o => {
      if (o.id === optionId) {
        let finalValue = value;
        
        // innerImage 기본값 설정
        const currentInnerImage = o.circleOverlay.innerImage || {
          scale: 100,
          position: { x: 50, y: 50 }
        };
        
        // 위치 업데이트 시 경계 제한 적용
        if (field === 'position') {
          const specsHeight = o.specsEnabled ? (o.specs.length * 29) : 0;
          const imageAreaHeight = o.height - 51 - specsHeight;
          const containerWidth = 470;
          const containerHeight = imageAreaHeight;
          
          const circleWidth = o.circleOverlay.size.width;
          const circleHeight = o.circleOverlay.size.height;
          
          const paddingX = (5 / containerWidth) * 100;
          const paddingY = (5 / containerHeight) * 100;
          
          const halfCircleWidthPercent = (circleWidth / 2 / containerWidth) * 100;
          const halfCircleHeightPercent = (circleHeight / 2 / containerHeight) * 100;
          
          const minX = halfCircleWidthPercent + paddingX;
          const maxX = 100 - halfCircleWidthPercent - paddingX;
          const minY = halfCircleHeightPercent + paddingY;
          const maxY = 100 - halfCircleHeightPercent - paddingY;
          
          finalValue = {
            x: Math.max(minX, Math.min(maxX, value.x)),
            y: Math.max(minY, Math.min(maxY, value.y))
          };
        }
        
        return { 
          ...o, 
          circleOverlay: { 
            ...o.circleOverlay,
            innerImage: currentInnerImage,
            [field]: finalValue 
          } 
        };
      }
      return o;
    }));
  };

  const updateCircleInnerImage = (optionId, field, value) => {
    setOptions(options.map(o => {
      if (o.id === optionId) {
        const currentInnerImage = o.circleOverlay.innerImage || {
          scale: 100,
          position: { x: 50, y: 50 }
        };
        
        return { 
          ...o, 
          circleOverlay: { 
            ...o.circleOverlay, 
            innerImage: {
              ...currentInnerImage,
              [field]: value
            }
          } 
        };
      }
      return o;
    }));
  };

  const startDrag = (optionId, type, e) => {
    const container = e.currentTarget.parentElement;
    const rect = container.getBoundingClientRect();
    const option = options.find(o => o.id === optionId);
    
    if (type === 'main') {
      setDragging({
        optionId,
        type: 'main',
        startX: e.clientX,
        startY: e.clientY,
        startPosX: option.imagePosition.x,
        startPosY: option.imagePosition.y,
        containerWidth: rect.width,
        containerHeight: rect.height
      });
    } else if (type === 'circle') {
      setDragging({
        optionId,
        type: 'circle',
        startX: e.clientX,
        startY: e.clientY,
        startPosX: option.circleOverlay.position.x,
        startPosY: option.circleOverlay.position.y,
        containerWidth: rect.width,
        containerHeight: rect.height
      });
    } else if (type === 'text') {
      setDragging({
        optionId,
        type: 'text',
        startX: e.clientX,
        startY: e.clientY,
        startPosX: option.textBox.position.x,
        startPosY: option.textBox.position.y,
        containerWidth: rect.width,
        containerHeight: rect.height
      });
    }
  };

  const onDrag = (e) => {
    if (!dragging) return;
    
    const deltaX = ((e.clientX - dragging.startX) / dragging.containerWidth) * 100;
    const deltaY = ((e.clientY - dragging.startY) / dragging.containerHeight) * 100;

    if (dragging.type === 'main') {
      setOptions(prevOptions => {
        const option = prevOptions.find(o => o.id === dragging.optionId);
        const newX = Math.max(0, Math.min(100, dragging.startPosX + deltaX));
        const newY = Math.max(0, Math.min(100, dragging.startPosY + deltaY));
        return prevOptions.map(o => 
          o.id === dragging.optionId ? { 
            ...o, 
            imagePosition: { 
              ...option.imagePosition,
              x: newX, 
              y: newY 
            } 
          } : o
        );
      });
    } else if (dragging.type === 'circle') {
      setOptions(prevOptions => {
        const option = prevOptions.find(o => o.id === dragging.optionId);
        const containerWidth = dragging.containerWidth;
        const containerHeight = dragging.containerHeight;
        const circleWidth = option.circleOverlay.size.width;
        const circleHeight = option.circleOverlay.size.height;
        
        const paddingX = (5 / containerWidth) * 100;
        const paddingY = (5 / containerHeight) * 100;
        
        const halfCircleWidthPercent = (circleWidth / 2 / containerWidth) * 100;
        const halfCircleHeightPercent = (circleHeight / 2 / containerHeight) * 100;
        
        const minX = halfCircleWidthPercent + paddingX;
        const maxX = 100 - halfCircleWidthPercent - paddingX;
        const minY = halfCircleHeightPercent + paddingY;
        const maxY = 100 - halfCircleHeightPercent - paddingY;
        
        const newX = Math.max(minX, Math.min(maxX, dragging.startPosX + deltaX));
        const newY = Math.max(minY, Math.min(maxY, dragging.startPosY + deltaY));
        
        return prevOptions.map(o => 
          o.id === dragging.optionId ? { 
            ...o, 
            circleOverlay: { 
              ...o.circleOverlay, 
              position: { x: newX, y: newY } 
            } 
          } : o
        );
      });
    } else if (dragging.type === 'text') {
      setOptions(prevOptions => {
        const containerWidth = dragging.containerWidth;
        const containerHeight = dragging.containerHeight;
        
        const paddingX = (5 / containerWidth) * 100;
        const paddingY = (5 / containerHeight) * 100;
        
        const minX = paddingX;
        const maxX = 100 - paddingX;
        const minY = paddingY;
        const maxY = 100 - paddingY;
        
        const newX = Math.max(minX, Math.min(maxX, dragging.startPosX + deltaX));
        const newY = Math.max(minY, Math.min(maxY, dragging.startPosY + deltaY));
        
        return prevOptions.map(o => 
          o.id === dragging.optionId ? { 
            ...o, 
            textBox: { 
              ...o.textBox, 
              position: { x: newX, y: newY } 
            } 
          } : o
        );
      });
    }
  };

  const stopDrag = () => {
    setDragging(null);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', onDrag);
      window.addEventListener('mouseup', stopDrag);
      return () => {
        window.removeEventListener('mousemove', onDrag);
        window.removeEventListener('mouseup', stopDrag);
      };
    }
  }, [dragging]);

  const addOption = () => {
    if (options.length >= 6) {
      alert('최대 6개의 옵션만 추가할 수 있습니다.');
      return;
    }
    const maxNum = options.length === 0 ? 0 : Math.max(...options.map(o => parseInt(o.number) || 0));
    const newNum = String(maxNum + 1).padStart(2, '0');
    setOptions([...options, {
      id: Date.now(),
      number: newNum,
      numberEnabled: true,
      numberBold: false,
      numberItalic: false,
      numberOutline: false,
      numberOutlineColor: '#FFFFFF',
      numberOutlineWidth: 1,
      title: '옵션명',
      titleBold: false,
      titleItalic: false,
      titleOutline: false,
      titleOutlineColor: '#FFFFFF',
      titleOutlineWidth: 1,
      titleAlign: 'left',
      fontSize: 22,
      numberSize: 28,
      numberColor: '#000000',
      titleColor: '#000000',
      height: 500,
      specsEnabled: false,
      specs: [],
      specsAlign: 'left',
      specsFontSize: 16,
      specsColor: '#535353',
      image: null,
      imagePosition: { x: 50, y: 50, scale: 100 },
      circleOverlay: { enabled: false, image: null, position: { x: 17, y: 18 }, size: { width: 150, height: 150 }, zIndex: 'front', backgroundColor: '#FFFFFF', innerImage: { scale: 100, position: { x: 50, y: 50 } } },
      textBox: { enabled: false, text: '', fontSize: 16, color: '#000000', position: { x: 50, y: 20 }, bold: false, italic: false, outline: false, outlineColor: '#FFFFFF', outlineWidth: 1 },
      circleOverlaysEnabled: false,
      circleOverlays: [],
      textBoxesEnabled: false,
      textBoxes: []
    }]);
  };

  const downloadAsImage = () => {
    // 미리보기 모드가 아니면 전환
    if (!document.getElementById('preview-area')) {
      setPreviewMode(true);
      setTimeout(() => {
        alert('미리보기가 표시되었습니다.\n\n이미지 저장 방법:\n\n1. Windows: Ctrl + Shift + S 또는 Win + Shift + S\n2. Mac: Cmd + Shift + 4\n3. 또는 브라우저 우클릭 > "다른 이름으로 저장" 선택\n\n영역을 선택하여 이미지로 저장하세요.');
      }, 500);
      return;
    }

    alert('이미지 저장 방법:\n\n1. Windows: Ctrl + Shift + S 또는 Win + Shift + S\n2. Mac: Cmd + Shift + 4\n3. 또는 브라우저 우클릭 > "다른 이름으로 저장" 선택\n\n아래 미리보기 영역을 선택하여 이미지로 저장하세요.');
  };

  const deleteOption = (id) => {
    setOptions(options.filter(o => o.id !== id));
  };

  const updateOption = (id, field, value) => {
    setOptions(options.map(o => 
      o.id === id ? { ...o, [field]: value } : o
    ));
  };

  const moveSection = (index, direction) => {
    const newOptions = [...options];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < options.length) {
      [newOptions[index], newOptions[newIndex]] = [newOptions[newIndex], newOptions[index]];
      setOptions(newOptions);
    }
  };

  const addSpec = (optionId) => {
    setOptions(options.map((o, idx) => {
      if (o.id === optionId) {
        if (o.specs.length >= 10) {
          alert('최대 10개까지만 추가할 수 있습니다.');
          return o;
        }
        const newSpecNum = o.specs.length + 1;
        const newHeight = Math.min(o.height + 30, 800);
        
        return {
          ...o,
          height: newHeight,
          specs: [...o.specs, { id: Date.now(), text: `${o.number}_${newSpecNum}. 사양 입력` }]
        };
      }
      const targetOption = options.find(opt => opt.id === optionId);
      const targetIndex = options.findIndex(opt => opt.id === optionId);
      const currentIndex = idx;
      
      if (Math.floor(targetIndex / 2) === Math.floor(currentIndex / 2)) {
        const newHeight = Math.min(targetOption.height + 30, 800);
        return { ...o, height: newHeight };
      }
      
      return o;
    }));
  };

  const deleteSpec = (optionId, specId) => {
    setOptions(options.map((o, idx) => {
      if (o.id === optionId) {
        const newHeight = Math.max(o.height - 30, 300);
        return { 
          ...o, 
          height: newHeight,
          specs: o.specs.filter(s => s.id !== specId) 
        };
      }
      const targetOption = options.find(opt => opt.id === optionId);
      const targetIndex = options.findIndex(opt => opt.id === optionId);
      const currentIndex = idx;
      
      if (Math.floor(targetIndex / 2) === Math.floor(currentIndex / 2)) {
        const newHeight = Math.max(targetOption.height - 30, 300);
        return { ...o, height: newHeight };
      }
      
      return o;
    }));
  };

  const updateSpec = (optionId, specId, text) => {
    setOptions(options.map(o => {
      if (o.id === optionId) {
        return {
          ...o,
          specs: o.specs.map(s => s.id === specId ? { ...s, text } : s)
        };
      }
      return o;
    }));
  };

  // 이미지 로딩 대기 헬퍼 함수
  const waitForImages = async (container) => {
    const images = container.querySelectorAll('img');
    const imagePromises = Array.from(images).map(img => {
      if (img.complete && img.naturalHeight !== 0) {
        return Promise.resolve();
      }
      return new Promise((resolve, reject) => {
        img.onload = () => {
          // decode까지 완료 대기
          if (img.decode) {
            img.decode().then(resolve).catch(resolve);
          } else {
            resolve();
          }
        };
        img.onerror = resolve; // 에러도 무시하고 진행
        // 타임아웃 설정
        setTimeout(resolve, 5000);
      });
    });
    await Promise.all(imagePromises);
  };

  // 폰트 로딩 대기 헬퍼 함수
  const waitForFonts = async () => {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    // 추가 대기 (폰트 렌더링 안정화)
    await new Promise(resolve => setTimeout(resolve, 300));
  };

  const exportImage = async () => {
    try {
      // 미리보기 모드가 아니면 먼저 전환
      if (!document.getElementById('preview-area')) {
        setPreviewMode(true);
        setTimeout(() => exportImage(), 800);
        return;
      }

      const previewArea = document.getElementById('preview-area');
      if (!previewArea) {
        alert('미리보기 영역을 찾을 수 없습니다.');
        return;
      }

      // 1. 모든 이미지 로딩 대기
      await waitForImages(previewArea);
      
      // 2. 폰트 로딩 대기
      await waitForFonts();

      // 3. 추가 렌더링 안정화 대기
      await new Promise(resolve => setTimeout(resolve, 200));

      // 4. html2canvas로 캡처 (scale 2 = 고해상도)
      const canvas = await html2canvas(previewArea, {
        scale: 2, // 고해상도 출력
        backgroundColor: backgroundColor,
        logging: false,
        useCORS: true,
        allowTaint: false,
        foreignObjectRendering: false,
        imageTimeout: 0,
        removeContainer: false,
        width: 1000, // 고정 너비
        windowWidth: 1000,
        onclone: (clonedDoc) => {
          // 모든 zoom 제거
          const allElements = clonedDoc.querySelectorAll('*');
          allElements.forEach(el => {
            const style = el.style;
            if (style.zoom) style.zoom = '';
          });

          // 모든 이미지 display: block, object-fit: contain, object-position: center 강제
          const images = clonedDoc.querySelectorAll('img');
          images.forEach(img => {
            img.style.display = 'block';
            img.style.objectFit = 'contain';
            img.style.objectPosition = 'center';
          });

          // imgFrame 클래스 확인
          const imgFrames = clonedDoc.querySelectorAll('.imgFrame');
          imgFrames.forEach(frame => {
            console.log('imgFrame:', frame.style.width, frame.style.height);
          });
        }
      });

      // 5. Blob으로 변환 후 다운로드
      canvas.toBlob(function(blob) {
        if (!blob) {
          alert('이미지 생성에 실패했습니다.');
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'product-options-' + Date.now() + '.png';
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 'image/png', 1.0);

    } catch (error) {
      console.error('이미지 저장 오류:', error);
      alert('이미지 저장에 실패했습니다: ' + error.message);
    }
  };

  const exportHTML = () => {
    // 미리보기 모드로 전환
    if (!document.getElementById('preview-area')) {
      setPreviewMode(true);
      setTimeout(() => exportHTML(), 500);
      return;
    }

    const titleFonts = `<link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css" />`;
    
    const gmarketFont = `
    @font-face {
      font-family: 'Gmarket Sans';
      font-style: normal;
      font-weight: 700;
      src: local('Gmarket Sans Bold'), local('GmarketSans-Bold'),
      url('http://script.ebay.co.kr/fonts/GmarketSansBold.woff2') format('woff2'),
      url('http://script.ebay.co.kr/fonts/GmarketSansBold.woff') format('woff');
    }
    @font-face {
      font-family: 'Gmarket Sans';
      font-style: normal;
      font-weight: 500;
      src: local('Gmarket Sans Medium'), local('GmarketSans-Medium'),
      url('http://script.ebay.co.kr/fonts/GmarketSansMedium.woff2') format('woff2'),
      url('http://script.ebay.co.kr/fonts/GmarketSansMedium.woff') format('woff');
    }
    @font-face {
      font-family: 'Gmarket Sans';
      font-style: normal;
      font-weight: 300;
      src: local('Gmarket Sans Light'), local('GmarketSans-Light'),
      url('http://script.ebay.co.kr/fonts/GmarketSansLight.woff2') format('woff2'),
      url('http://script.ebay.co.kr/fonts/GmarketSansLight.woff') format('woff');
    }
    ${jalnanFont ? `@font-face {
      font-family: 'Jalnan';
      src: url('${jalnanFont}');
      font-style: normal;
    }` : ''}
    ${impactFont ? `@font-face {
      font-family: 'Impact';
      src: url('${impactFont}');
      font-style: normal;
    }` : ''}`;

    // 미리보기 DOM에서 실제 HTML 가져오기
    const previewArea = document.getElementById('preview-area');
    const clonedContent = previewArea.cloneNode(true);
    clonedContent.removeAttribute('id');
    const previewHTML = clonedContent.outerHTML;
    
    const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>상품 옵션</title>
  ${titleFonts}
  <style>${gmarketFont}
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Gmarket Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: ${backgroundColor}; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; padding: 20px 0; }
  </style>
</head>
<body>
  ${previewHTML}
  <div style="text-align: center; padding: 20px; position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);">
    <button id="downloadBtn" style="padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 6px; font-size: 16px; cursor: pointer; font-weight: 500; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      📥 이미지로 다운로드
    </button>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
  <script>
    // 모든 이미지 로딩 대기
    async function waitForImages() {
      const images = document.querySelectorAll('img');
      const promises = Array.from(images).map(img => {
        if (img.complete && img.naturalHeight !== 0) {
          return Promise.resolve();
        }
        return new Promise(resolve => {
          img.onload = () => {
            if (img.decode) {
              img.decode().then(resolve).catch(resolve);
            } else {
              resolve();
            }
          };
          img.onerror = resolve;
          setTimeout(resolve, 5000);
        });
      });
      await Promise.all(promises);
    }

    // 폰트 로딩 대기
    async function waitForFonts() {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    window.onload = async function() {
      await waitForImages();
      console.log('모든 이미지 로드 완료');
    };
    
    document.getElementById('downloadBtn').addEventListener('click', async function() {
      const container = document.querySelector('[style*="width: 1000px"]') || document.querySelector('div');
      if (!container) {
        alert('컨테이너를 찾을 수 없습니다.');
        return;
      }
      
      this.textContent = '⏳ 이미지 생성 중...';
      this.disabled = true;
      
      // 이미지 및 폰트 로딩 대기
      await waitForImages();
      await waitForFonts();
      await new Promise(resolve => setTimeout(resolve, 200));
      
      try {
        const canvas = await html2canvas(container, {
          scale: 2,
          backgroundColor: '${backgroundColor}',
          logging: false,
          useCORS: true,
          allowTaint: false,
          foreignObjectRendering: false,
          imageTimeout: 0,
          removeContainer: false,
          width: 1000,
          windowWidth: 1000,
          onclone: (clonedDoc) => {
            // zoom 제거
            const allElements = clonedDoc.querySelectorAll('*');
            allElements.forEach(el => {
              if (el.style.zoom) el.style.zoom = '';
            });
            
            // 모든 이미지 display: block, object-fit: contain, object-position: center 강제
            const images = clonedDoc.querySelectorAll('img');
            images.forEach(img => {
              img.style.display = 'block';
              img.style.objectFit = 'contain';
              img.style.objectPosition = 'center';
            });
          }
        });
        
        canvas.toBlob(function(blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = 'product-options-' + Date.now() + '.png';
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
          
          document.getElementById('downloadBtn').textContent = '✅ 다운로드 완료!';
          setTimeout(() => window.close(), 1000);
        }, 'image/png', 1.0);
      } catch (error) {
        console.error('Error:', error);
        alert('이미지 생성 실패: ' + error.message);
        this.textContent = '📥 이미지로 다운로드';
        this.disabled = false;
      }
    });
  </script>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `product-options-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (previewMode) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">미리보기</h1>
            <div className="flex gap-3">
              <button
                onClick={() => setPreviewMode(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                편집 모드
              </button>
              <button
                onClick={exportImage}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
              >
                <Download size={18} />
                이미지 저장
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center py-10">
          <div id="preview-area" style={{ 
            width: '1000px', 
            padding: '20px 0', 
            background: backgroundColor,
            position: 'relative',
            overflow: 'hidden'
          }}>
            {titleEnabled && (
            <div 
              style={{ 
                background: titleBgColor, 
                color: titleTextColor,
                padding: '0 20px',
                fontSize: '28px',
                fontWeight: 'bold',
                position: 'relative',
                paddingLeft: '45px',
                height: '60px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '20px',
                background: titleAccentColor
              }}></div>
              <span style={{ fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontWeight: 700, fontSize: '28px', lineHeight: 1 }}>
                {title.split('_')[0]}{title.split('_')[1] ? '_' : ''}
              </span>
              {title.split('_')[1] && (
                <span style={{ 
                  fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif', 
                  fontWeight: 500,
                  fontSize: '28px',
                  lineHeight: 1
                }}>
                  {title.split('_')[1]}
                </span>
              )}
            </div>
            )}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 470px)',
              gap: '20px',
              justifyContent: 'center',
              padding: titleEnabled ? '20px 20px 0 20px' : '0 20px',
              background: backgroundColor
            }}>
              {options.map(opt => (
                <div 
                  key={opt.id}
                  style={{
                    width: '470px',
                    height: `${opt.height}px`,
                    background: 'white',
                    border: '2px solid #ddd',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{
                    background: '#e0e0e0',
                    padding: '8px 15px 8px 2px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    minHeight: '52px',
                    height: '52px'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: 'white',
                      borderRadius: '50%',
                      display: opt.numberEnabled ? 'flex' : 'none',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: `${opt.numberSize}px`,
                      fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                      fontWeight: opt.numberBold ? 900 : 700,
                      fontStyle: opt.numberItalic ? 'italic' : 'normal',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.20)',
                      flexShrink: 0,
                      letterSpacing: '-0.5px',
                      color: opt.numberColor || '#000000',
                      marginTop: '-1px',
                      textShadow: opt.numberOutline ? 
                        generateTextOutline(opt.numberOutlineColor, opt.numberOutlineWidth || 1)
                        : 'none'
                    }}>
                      {opt.number}
                    </div>
                    <div style={{ flex: 1, paddingRight: '10px', display: 'flex', alignItems: 'center', marginTop: '2px', fontSize: `${opt.fontSize}px`, fontFamily: "'Gmarket Sans', sans-serif", fontWeight: opt.titleBold ? 900 : 500, fontStyle: opt.titleItalic ? 'italic' : 'normal', transform: 'scaleX(0.95)', transformOrigin: opt.titleAlign === 'left' ? 'left' : opt.titleAlign === 'right' ? 'right' : 'center', textAlign: opt.titleAlign, color: opt.titleColor || '#000000', textShadow: opt.titleOutline ? generateTextOutline(opt.titleOutlineColor, opt.titleOutlineWidth || 1) : 'none' }}>
                      <div style={{ width: '100%', textAlign: opt.titleAlign }}>
                        {opt.title}
                      </div>
                    </div>
                  </div>
                  {opt.specsEnabled && opt.specs.length > 0 && (
                  <div style={{
                    padding: 0,
                    fontSize: `${opt.specsFontSize}px`,
                    lineHeight: 1,
                    borderTop: '1px solid #ddd'
                  }}>
                    {opt.specs.map((spec, idx) => (
                      <div 
                        key={spec.id} 
                        style={{
                          borderBottom: '1px solid #ddd',
                          color: opt.specsColor
                        }}
                      >
                        <div style={{
                          padding: '8px 20px 4px 20px',
                          fontFamily: "'Gmarket Sans', sans-serif",
                          fontWeight: 500,
                          transform: 'scaleX(0.95)',
                          transformOrigin: opt.specsAlign === 'left' ? 'left' : opt.specsAlign === 'right' ? 'right' : 'center',
                          textAlign: opt.specsAlign
                        }}>
                          {spec.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  )}
                  {(opt.image || opt.circleOverlay.enabled || opt.textBox.enabled) && (
                    <div style={{ 
                      position: 'relative',
                      flex: 1,
                      overflow: 'hidden',
                      minHeight: 0
                    }}>
                      {opt.image && (
                        <div 
                          className="imgFrame"
                          style={{
                            position: 'absolute',
                            left: `${opt.imagePosition.x}%`,
                            top: `${opt.imagePosition.y}%`,
                            width: `${466 * (opt.imagePosition.scale || 100) / 100}px`,
                            height: `${(opt.height - 52 - (opt.specsEnabled && opt.specs.length > 0 ? opt.specs.length * 30 : 0)) * (opt.imagePosition.scale || 100) / 100}px`,
                            transform: 'translate(-50%, -50%)',
                            zIndex: opt.circleOverlay.enabled && opt.circleOverlay.zIndex === 'front' ? 1 : 2
                          }}
                        >
                          <img 
                            src={opt.image} 
                            alt={opt.title}
                            style={{ 
                              display: 'block',
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                              objectPosition: 'center'
                            }}
                          />
                        </div>
                      )}
                      {opt.circleOverlay.enabled && (
                        <div 
                          style={{
                            position: 'absolute',
                            left: `${opt.circleOverlay.position.x}%`,
                            top: `${opt.circleOverlay.position.y}%`,
                            width: `${opt.circleOverlay.size.width}px`,
                            height: `${opt.circleOverlay.size.height}px`,
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '3px solid #ddd',
                            backgroundColor: opt.circleOverlay.backgroundColor || '#FFFFFF',
                            zIndex: opt.circleOverlay.zIndex === 'front' ? 2 : 1,
                            transform: 'translate(-50%, -50%)'
                          }}
                        >
                          {opt.circleOverlay.image && (
                            <div
                              style={{
                                position: 'absolute',
                                left: `${opt.circleOverlay.innerImage?.position?.x || 50}%`,
                                top: `${opt.circleOverlay.innerImage?.position?.y || 50}%`,
                                width: `${opt.circleOverlay.size.width * (opt.circleOverlay.innerImage?.scale || 100) / 100}px`,
                                height: `${opt.circleOverlay.size.height * (opt.circleOverlay.innerImage?.scale || 100) / 100}px`,
                                transform: 'translate(-50%, -50%)'
                              }}
                            >
                              <img 
                                src={opt.circleOverlay.image}
                                alt="detail"
                                style={{
                                  display: 'block',
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'contain',
                                  objectPosition: 'center'
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}
                      {opt.textBox.enabled && opt.textBox.text && (
                        <div 
                          style={{
                            position: 'absolute',
                            left: `${opt.textBox.position?.x || 50}%`,
                            top: `${opt.textBox.position?.y || 20}%`,
                            transform: 'translate(-50%, -50%)',
                            fontSize: `${opt.textBox.fontSize}px`,
                            color: opt.textBox.color,
                            fontFamily: "'Gmarket Sans', sans-serif",
                            fontWeight: opt.textBox.bold ? 900 : 500,
                            fontStyle: opt.textBox.italic ? 'italic' : 'normal',
                            whiteSpace: 'nowrap',
                            zIndex: 3,
                            pointerEvents: 'none',
                            textShadow: opt.textBox.outline ? 
                              generateTextOutline(opt.textBox.outlineColor, opt.textBox.outlineWidth || 1)
                              : 'none'
                          }}
                        >
                          {opt.textBox.text}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 왼쪽 광고 배너 영역 */}
      <div className="w-48 flex-shrink-0 bg-gray-100 p-4">
        <div className="sticky" style={{ top: '50%', transform: 'translateY(-50%)' }}>
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-3 text-center shadow-sm">
            <p className="text-xs text-gray-500 mb-2 font-semibold">Adsterra</p>
            <div className="bg-gray-50 rounded p-2 min-h-[600px]" id="adsterra-container">
              <div id="container-e0a030d49075e7508ace9906e2111ed2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="flex-1 flex flex-col">
        {/* 저작권 정보 */}
        <div className="bg-gray-50 border-b border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-xs text-black text-center leading-tight">
              Copyright 2026. MUJIMUJI / Options Editor All rights reserved. 본 서비스의 무단 전재, 복제 및 배포를 금지합니다.
            </p>
            <p className="text-xs text-black text-center mt-0.5">
              문의 및 버그 제보 Mail : mujimuji.purity012@aleeas.com / World Green <a href="https://smartstore.naver.com/wg0057" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">https://smartstore.naver.com/wg0057</a>
            </p>
          </div>
        </div>

        <div className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold">상품 옵션 에디터</h1>
            <button
              onClick={() => setPreviewMode(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              미리보기
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-4" style={{ minWidth: '1040px' }}>
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex items-center gap-6">
            {/* 전체 배경색 */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium whitespace-nowrap">전체 배경색</label>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="h-10 w-20 border rounded cursor-pointer"
              />
            </div>

            {/* 타이틀 설정 */}
            <div className="flex items-center gap-3 flex-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={titleEnabled}
                  onChange={(e) => setTitleEnabled(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium whitespace-nowrap">타이틀 설정</span>
              </label>
              
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 px-3 py-2 border rounded text-sm"
                placeholder="PRODUCT OPTION_제품 옵션"
              />

              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-600 whitespace-nowrap">강조 바 색상</label>
                <input
                  type="color"
                  value={titleAccentColor}
                  onChange={(e) => setTitleAccentColor(e.target.value)}
                  className="h-10 w-16 border rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-600 whitespace-nowrap">배경색</label>
                <input
                  type="color"
                  value={titleBgColor}
                  onChange={(e) => setTitleBgColor(e.target.value)}
                  className="h-10 w-16 border rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-600 whitespace-nowrap">텍스트 색상</label>
                <input
                  type="color"
                  value={titleTextColor}
                  onChange={(e) => setTitleTextColor(e.target.value)}
                  className="h-10 w-16 border rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <button
            onClick={addOption}
            disabled={options.length >= 6}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 font-medium ${
              options.length >= 6 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Plus size={20} />
            새 옵션 추가 ({options.length}/6)
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', minWidth: '1000px' }}>
          {options.map((option, index) => (
            <div key={option.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold">옵션 {option.number}</h3>
                <div className="flex gap-2">
                  <button onClick={() => moveSection(index, 'up')} disabled={index === 0} className="p-1 hover:bg-gray-100 rounded disabled:opacity-30">
                    <ChevronUp size={20} />
                  </button>
                  <button onClick={() => moveSection(index, 'down')} disabled={index === options.length - 1} className="p-1 hover:bg-gray-100 rounded disabled:opacity-30">
                    <ChevronDown size={20} />
                  </button>
                  <button
                    onClick={() => deleteOption(option.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">박스 높이: {option.height}px</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="range"
                      min="300"
                      max="800"
                      value={option.height}
                      onChange={(e) => updateOption(option.id, 'height', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <input
                      type="number"
                      min="300"
                      max="800"
                      value={option.height}
                      onChange={(e) => {
                        const val = e.target.value === '' ? 300 : parseInt(e.target.value);
                        updateOption(option.id, 'height', val);
                      }}
                      onBlur={(e) => {
                        const val = parseInt(e.target.value) || 300;
                        updateOption(option.id, 'height', Math.max(300, Math.min(800, val)));
                      }}
                      className="w-20 px-2 py-1 border rounded text-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <input
                      type="checkbox"
                      checked={option.numberEnabled}
                      onChange={(e) => updateOption(option.id, 'numberEnabled', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label className="text-sm font-medium">옵션 번호</label>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={option.number}
                      onChange={(e) => updateOption(option.id, 'number', e.target.value)}
                      className="flex-1 px-3 py-2 border rounded"
                      placeholder="01"
                      disabled={!option.numberEnabled}
                    />
                    <select
                      value={option.numberSize}
                      onChange={(e) => updateOption(option.id, 'numberSize', parseInt(e.target.value))}
                      className="w-20 px-2 py-2 border rounded bg-white text-sm"
                      title="글자 크기"
                      disabled={!option.numberEnabled}
                    >
                      {Array.from({length: 17}, (_, i) => 20 + i).map(size => (
                        <option key={size} value={size}>{size}px</option>
                      ))}
                    </select>
                    <input
                      type="color"
                      value={option.numberColor || '#000000'}
                      onChange={(e) => updateOption(option.id, 'numberColor', e.target.value)}
                      className="w-12 h-10 border rounded cursor-pointer"
                      title="번호 색상"
                      disabled={!option.numberEnabled}
                    />
                  </div>
                  {option.numberEnabled && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <label className="flex items-center gap-1 cursor-pointer text-xs">
                        <input
                          type="checkbox"
                          checked={option.numberBold}
                          onChange={(e) => updateOption(option.id, 'numberBold', e.target.checked)}
                          className="w-3 h-3"
                        />
                        <span style={{ fontWeight: 'bold' }}>두껍게</span>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer text-xs">
                        <input
                          type="checkbox"
                          checked={option.numberItalic}
                          onChange={(e) => updateOption(option.id, 'numberItalic', e.target.checked)}
                          className="w-3 h-3"
                        />
                        <span style={{ fontStyle: 'italic' }}>기울이기</span>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer text-xs">
                        <input
                          type="checkbox"
                          checked={option.numberOutline}
                          onChange={(e) => updateOption(option.id, 'numberOutline', e.target.checked)}
                          className="w-3 h-3"
                        />
                        테두리
                      </label>
                      {option.numberOutline && (
                        <>
                          <input
                            type="color"
                            value={option.numberOutlineColor}
                            onChange={(e) => updateOption(option.id, 'numberOutlineColor', e.target.value)}
                            className="h-6 w-12 rounded cursor-pointer"
                            title="테두리 색상"
                          />
                          <input
                            type="number"
                            min="1"
                            max="5"
                            value={option.numberOutlineWidth || 1}
                            onChange={(e) => updateOption(option.id, 'numberOutlineWidth', parseInt(e.target.value) || 1)}
                            className="w-12 px-1 py-1 border rounded text-xs"
                            title="테두리 두께"
                          />
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">옵션명</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={option.title}
                      onChange={(e) => updateOption(option.id, 'title', e.target.value)}
                      className="flex-1 px-3 py-2 border rounded"
                      placeholder="옵션명"
                    />
                    <select
                      value={option.fontSize}
                      onChange={(e) => updateOption(option.id, 'fontSize', parseInt(e.target.value))}
                      className="w-20 px-2 py-2 border rounded bg-white text-sm"
                      title="글자 크기"
                    >
                      {Array.from({length: 17}, (_, i) => 16 + i).map(size => (
                        <option key={size} value={size}>{size}px</option>
                      ))}
                    </select>
                    <input
                      type="color"
                      value={option.titleColor || '#000000'}
                      onChange={(e) => updateOption(option.id, 'titleColor', e.target.value)}
                      className="w-12 h-10 border rounded cursor-pointer"
                      title="옵션명 색상"
                    />
                  </div>
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <button
                      onClick={() => updateOption(option.id, 'titleAlign', 'left')}
                      className={`p-1 rounded ${option.titleAlign === 'left' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                      title="왼쪽 정렬"
                    >
                      <AlignLeft size={16} />
                    </button>
                    <button
                      onClick={() => updateOption(option.id, 'titleAlign', 'center')}
                      className={`p-1 rounded ${option.titleAlign === 'center' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                      title="중앙 정렬"
                    >
                      <AlignCenter size={16} />
                    </button>
                    <button
                      onClick={() => updateOption(option.id, 'titleAlign', 'right')}
                      className={`p-1 rounded ${option.titleAlign === 'right' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                      title="오른쪽 정렬"
                    >
                      <AlignRight size={16} />
                    </button>
                    <span className="text-gray-300">|</span>
                    <label className="flex items-center gap-1 cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={option.titleBold}
                        onChange={(e) => updateOption(option.id, 'titleBold', e.target.checked)}
                        className="w-3 h-3"
                      />
                      <span style={{ fontWeight: 'bold' }}>두껍게</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={option.titleItalic}
                        onChange={(e) => updateOption(option.id, 'titleItalic', e.target.checked)}
                        className="w-3 h-3"
                      />
                      <span style={{ fontStyle: 'italic' }}>기울이기</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={option.titleOutline}
                        onChange={(e) => updateOption(option.id, 'titleOutline', e.target.checked)}
                        className="w-3 h-3"
                      />
                      테두리
                    </label>
                    {option.titleOutline && (
                      <>
                        <input
                          type="color"
                          value={option.titleOutlineColor}
                          onChange={(e) => updateOption(option.id, 'titleOutlineColor', e.target.value)}
                          className="h-6 w-12 rounded cursor-pointer"
                          title="테두리 색상"
                        />
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={option.titleOutlineWidth || 1}
                          onChange={(e) => updateOption(option.id, 'titleOutlineWidth', parseInt(e.target.value) || 1)}
                          className="w-12 px-1 py-1 border rounded text-xs"
                          title="테두리 두께"
                        />
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">이미지</label>
                  <label className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 border-2 border-dashed rounded cursor-pointer hover:bg-gray-200">
                    <Image size={18} />
                    이미지 업로드
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload(option.id)}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* 옵션 사양 섹션 */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={option.specsEnabled}
                        onChange={(e) => {
                          setOptions(options.map(o => 
                            o.id === option.id ? { ...o, specsEnabled: e.target.checked } : o
                          ));
                        }}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium">옵션 사양 (최대 10개)</span>
                    </label>
                    
                    {option.specsEnabled && (
                      <>
                        <button
                          onClick={() => addSpec(option.id)}
                          disabled={option.specs.length >= 10}
                          className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          + 추가
                        </button>
                        
                        <div className="flex items-center gap-1 ml-2">
                          <button
                            onClick={() => setOptions(options.map(o => o.id === option.id ? { ...o, specsAlign: 'left' } : o))}
                            className={`p-1 rounded ${option.specsAlign === 'left' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                            title="왼쪽 정렬"
                          >
                            <AlignLeft size={16} />
                          </button>
                          <button
                            onClick={() => setOptions(options.map(o => o.id === option.id ? { ...o, specsAlign: 'center' } : o))}
                            className={`p-1 rounded ${option.specsAlign === 'center' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                            title="중앙 정렬"
                          >
                            <AlignCenter size={16} />
                          </button>
                          <button
                            onClick={() => setOptions(options.map(o => o.id === option.id ? { ...o, specsAlign: 'right' } : o))}
                            className={`p-1 rounded ${option.specsAlign === 'right' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                            title="오른쪽 정렬"
                          >
                            <AlignRight size={16} />
                          </button>
                        </div>
                        
                        <select
                          value={option.specsFontSize}
                          onChange={(e) => setOptions(options.map(o => o.id === option.id ? { ...o, specsFontSize: parseInt(e.target.value) } : o))}
                          className="px-2 py-1 border rounded text-xs bg-white"
                          title="폰트 크기"
                        >
                          {Array.from({length: 13}, (_, i) => 12 + i).map(size => (
                            <option key={size} value={size}>{size}px</option>
                          ))}
                        </select>
                        
                        <input
                          type="color"
                          value={option.specsColor}
                          onChange={(e) => setOptions(options.map(o => o.id === option.id ? { ...o, specsColor: e.target.value } : o))}
                          className="w-8 h-8 rounded cursor-pointer border"
                          title="색상"
                        />
                      </>
                    )}
                  </div>
                  
                  {option.specsEnabled && (
                    <>
                      <div className="space-y-1.5">
                        {option.specs.map((spec) => (
                          <div key={spec.id} className="flex gap-2">
                            <input
                              type="text"
                              value={spec.text}
                              onChange={(e) => updateSpec(option.id, spec.id, e.target.value)}
                              className="flex-1 px-3 py-2 border rounded text-sm"
                              placeholder="01_1. 기본형 90x60cm"
                            />
                            <button
                              onClick={() => deleteSpec(option.id, spec.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                      {option.specs.length >= 10 && (
                        <p className="text-xs text-orange-600 mt-1">※ 최대 10개까지 추가할 수 있습니다.</p>
                      )}
                    </>
                  )}
                </div>

                {/* 원형 디테일샷 오버레이 */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={option.circleOverlay.enabled}
                        onChange={() => toggleCircleOverlay(option.id)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium">원형 디테일샷 오버레이</span>
                    </label>
                    
                    {option.circleOverlay.enabled && (
                      <label className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer text-sm flex items-center gap-2">
                        <Image size={14} />
                        원형 이미지 업로드
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCircleImageUpload(option.id)}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  {option.circleOverlay.enabled && option.circleOverlay.image && (
                    <div className="space-y-3 p-3 bg-blue-50 border border-blue-200 rounded">
                      <div className="flex items-end gap-2">
                        <div className="flex-1">
                          <label className="block text-xs text-gray-700 mb-1">가로 크기</label>
                          <input
                            type="number"
                            min="60"
                            max="300"
                            value={option.circleOverlay.size.width}
                            onChange={(e) => {
                              const val = e.target.value === '' ? 60 : parseInt(e.target.value);
                              updateCircleOverlay(option.id, 'size', { 
                                ...option.circleOverlay.size, 
                                width: val
                              });
                            }}
                            className="w-full px-2 py-1 border rounded text-xs"
                          />
                        </div>

                        <div className="flex-1">
                          <label className="block text-xs text-gray-700 mb-1">세로 크기</label>
                          <input
                            type="number"
                            min="60"
                            max="300"
                            value={option.circleOverlay.size.height}
                            onChange={(e) => {
                              const val = e.target.value === '' ? 60 : parseInt(e.target.value);
                              updateCircleOverlay(option.id, 'size', { 
                                ...option.circleOverlay.size, 
                                height: val
                              });
                            }}
                            className="w-full px-2 py-1 border rounded text-xs"
                          />
                        </div>

                        <div className="flex-1">
                          <label className="block text-xs text-gray-700 mb-1">레이어 위치</label>
                          <select
                            value={option.circleOverlay.zIndex}
                            onChange={(e) => updateCircleOverlay(option.id, 'zIndex', e.target.value)}
                            className="w-full px-2 py-1 border rounded text-xs bg-white"
                          >
                            <option value="front">메인 이미지 앞</option>
                            <option value="back">메인 이미지 뒤</option>
                          </select>
                        </div>

                        <div className="flex-1">
                          <label className="block text-xs text-gray-700 mb-1">원형 배경색</label>
                          <input
                            type="color"
                            value={option.circleOverlay.backgroundColor || '#FFFFFF'}
                            onChange={(e) => updateCircleOverlay(option.id, 'backgroundColor', e.target.value)}
                            className="h-7 w-full rounded cursor-pointer"
                          />
                        </div>
                      </div>

                      <div>
                          <div className="text-xs font-semibold text-gray-700 mb-2">원형 안 이미지 조정</div>
                          
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <label className="text-xs text-gray-700 whitespace-nowrap">크기:</label>
                                <input
                                  type="number"
                                  min="50"
                                  max="400"
                                  value={option.circleOverlay.innerImage?.scale || 100}
                                  onChange={(e) => {
                                    const val = e.target.value === '' ? 100 : parseInt(e.target.value);
                                    updateCircleInnerImage(option.id, 'scale', val);
                                  }}
                                  className="w-16 px-1 py-1 border rounded text-xs"
                                />
                                <span className="text-xs text-gray-500">%</span>
                              </div>
                              <input
                                type="range"
                                min="50"
                                max="400"
                                value={option.circleOverlay.innerImage?.scale || 100}
                                onChange={(e) => updateCircleInnerImage(option.id, 'scale', parseInt(e.target.value))}
                                className="w-full"
                              />
                            </div>

                            <div>
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <label className="text-xs text-gray-700 whitespace-nowrap">가로:</label>
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={Math.round(option.circleOverlay.innerImage?.position?.x || 50)}
                                  onChange={(e) => {
                                    const val = e.target.value === '' ? 50 : parseFloat(e.target.value);
                                    updateCircleInnerImage(option.id, 'position', { 
                                      ...option.circleOverlay.innerImage.position, 
                                      x: val
                                    });
                                  }}
                                  className="w-16 px-1 py-1 border rounded text-xs"
                                />
                                <span className="text-xs text-gray-500">%</span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={option.circleOverlay.innerImage?.position?.x || 50}
                                onChange={(e) => updateCircleInnerImage(option.id, 'position', { 
                                  ...option.circleOverlay.innerImage.position, 
                                  x: parseFloat(e.target.value) 
                                })}
                                className="w-full"
                              />
                            </div>

                            <div>
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <label className="text-xs text-gray-700 whitespace-nowrap">세로:</label>
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={Math.round(option.circleOverlay.innerImage?.position?.y || 50)}
                                  onChange={(e) => {
                                    const val = e.target.value === '' ? 50 : parseFloat(e.target.value);
                                    updateCircleInnerImage(option.id, 'position', { 
                                      ...option.circleOverlay.innerImage.position, 
                                      y: val
                                    });
                                  }}
                                  className="w-16 px-1 py-1 border rounded text-xs"
                                />
                                <span className="text-xs text-gray-500">%</span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={option.circleOverlay.innerImage?.position?.y || 50}
                                onChange={(e) => updateCircleInnerImage(option.id, 'position', { 
                                  ...option.circleOverlay.innerImage.position, 
                                  y: parseFloat(e.target.value) 
                                })}
                                className="w-full"
                              />
                            </div>
                          </div>

                          <div className="flex gap-2 text-xs mt-2">
                            <button
                              onClick={() => {
                                setOptions(options.map(o => 
                                  o.id === option.id ? {
                                    ...o,
                                    circleOverlay: {
                                      ...o.circleOverlay,
                                      innerImage: {
                                        scale: 100,
                                        position: { x: 50, y: 50 }
                                      }
                                    }
                                  } : o
                                ));
                              }}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              원형 내부 이미지 리셋
                            </button>
                            <span className="text-gray-300">|</span>
                            <button
                              onClick={() => updateCircleOverlay(option.id, 'position', { x: 17, y: 18 })}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              원형 위치 리셋 (왼쪽 상단)
                            </button>
                            <span className="text-gray-300">|</span>
                            <button
                              onClick={() => deleteCircleImage(option.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              원형 이미지 삭제
                            </button>
                          </div>
                        </div>
                    </div>
                  )}
                </div>

                {/* 텍스트 추가 */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={option.textBox.enabled}
                        onChange={(e) => {
                          setOptions(options.map(o => 
                            o.id === option.id ? { 
                              ...o, 
                              textBox: { ...o.textBox, enabled: e.target.checked } 
                            } : o
                          ));
                        }}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium">텍스트 추가</span>
                    </label>
                  </div>

                  {option.textBox.enabled && (
                    <div className="space-y-2 p-3 bg-green-50 border border-green-200 rounded">
                      {/* 텍스트 입력 */}
                      <div>
                        <label className="block text-xs text-gray-700 mb-1">텍스트</label>
                        <input
                          type="text"
                          value={option.textBox.text}
                          onChange={(e) => {
                            setOptions(options.map(o => 
                              o.id === option.id ? { 
                                ...o, 
                                textBox: { ...o.textBox, text: e.target.value } 
                              } : o
                            ));
                          }}
                          className="w-full px-2 py-1 border rounded text-xs"
                          placeholder="문자 입력"
                        />
                      </div>

                      {/* 스타일, 위치, 글자 크기, 색상 */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <label className="flex items-center gap-1 cursor-pointer text-xs">
                            <input
                              type="checkbox"
                              checked={option.textBox.bold}
                              onChange={(e) => {
                                setOptions(options.map(o => 
                                  o.id === option.id ? { 
                                    ...o, 
                                    textBox: { ...o.textBox, bold: e.target.checked } 
                                  } : o
                                ));
                              }}
                              className="w-3 h-3"
                            />
                            <span style={{ fontWeight: 'bold' }}>두껍게</span>
                          </label>

                          <label className="flex items-center gap-1 cursor-pointer text-xs">
                            <input
                              type="checkbox"
                              checked={option.textBox.italic}
                              onChange={(e) => {
                                setOptions(options.map(o => 
                                  o.id === option.id ? { 
                                    ...o, 
                                    textBox: { ...o.textBox, italic: e.target.checked } 
                                  } : o
                                ));
                              }}
                              className="w-3 h-3"
                            />
                            <span style={{ fontStyle: 'italic' }}>기울이기</span>
                          </label>

                          <label className="flex items-center gap-1 cursor-pointer text-xs">
                            <input
                              type="checkbox"
                              checked={option.textBox.outline}
                              onChange={(e) => {
                                setOptions(options.map(o => 
                                  o.id === option.id ? { 
                                    ...o, 
                                    textBox: { ...o.textBox, outline: e.target.checked } 
                                  } : o
                                ));
                              }}
                              className="w-3 h-3"
                            />
                            테두리
                          </label>

                          {option.textBox.outline && (
                            <>
                              <input
                                type="color"
                                value={option.textBox.outlineColor}
                                onChange={(e) => {
                                  setOptions(options.map(o => 
                                    o.id === option.id ? { 
                                      ...o, 
                                      textBox: { ...o.textBox, outlineColor: e.target.value } 
                                    } : o
                                  ));
                                }}
                                className="h-6 w-12 rounded cursor-pointer"
                                title="테두리 색상"
                              />
                              <input
                                type="number"
                                min="1"
                                max="5"
                                value={option.textBox.outlineWidth || 1}
                                onChange={(e) => {
                                  setOptions(options.map(o => 
                                    o.id === option.id ? { 
                                      ...o, 
                                      textBox: { ...o.textBox, outlineWidth: parseInt(e.target.value) || 1 } 
                                    } : o
                                  ));
                                }}
                                className="w-12 px-1 py-1 border rounded text-xs"
                                title="테두리 두께"
                              />
                            </>
                          )}

                          <select
                            value={option.textBox.fontSize}
                            onChange={(e) => {
                              setOptions(options.map(o => 
                                o.id === option.id ? { 
                                  ...o, 
                                  textBox: { ...o.textBox, fontSize: parseInt(e.target.value) } 
                                } : o
                              ));
                            }}
                            className="px-2 py-1 border rounded text-xs bg-white"
                            title="글자 크기"
                          >
                            {Array.from({length: 25}, (_, i) => 12 + i).map(size => (
                              <option key={size} value={size}>{size}px</option>
                            ))}
                          </select>

                          <input
                            type="color"
                            value={option.textBox.color}
                            onChange={(e) => {
                              setOptions(options.map(o => 
                                o.id === option.id ? { 
                                  ...o, 
                                  textBox: { ...o.textBox, color: e.target.value } 
                                } : o
                              ));
                            }}
                            className="h-7 w-16 rounded cursor-pointer"
                            title="텍스트 색상"
                          />
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <label className="text-xs text-gray-700">가로:</label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={option.textBox.position?.x || 50}
                              onChange={(e) => {
                                setOptions(options.map(o => 
                                  o.id === option.id ? {
                                    ...o,
                                    textBox: {
                                      ...o.textBox,
                                      position: { 
                                        ...o.textBox.position, 
                                        x: parseFloat(e.target.value) 
                                      }
                                    }
                                  } : o
                                ));
                              }}
                              className="w-20"
                            />
                            <span className="text-xs text-gray-600 w-8">{Math.round(option.textBox.position?.x || 50)}%</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <label className="text-xs text-gray-700">세로:</label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={option.textBox.position?.y || 20}
                              onChange={(e) => {
                                setOptions(options.map(o => 
                                  o.id === option.id ? {
                                    ...o,
                                    textBox: {
                                      ...o.textBox,
                                      position: { 
                                        ...o.textBox.position, 
                                        y: parseFloat(e.target.value) 
                                      }
                                    }
                                  } : o
                                ));
                              }}
                              className="w-20"
                            />
                            <span className="text-xs text-gray-600 w-8">{Math.round(option.textBox.position?.y || 20)}%</span>
                          </div>

                          <button
                            onClick={() => {
                              setOptions(options.map(o => 
                                o.id === option.id ? {
                                  ...o,
                                  textBox: {
                                    ...o.textBox,
                                    position: { x: 50, y: 20 }
                                  }
                                } : o
                              ));
                            }}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            위치 리셋
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 전체 옵션 박스 미리보기 */}
                <div>
                  <div 
                    style={{
                      width: '100%',
                      maxWidth: '470px',
                      height: `${option.height}px`,
                      background: 'white',
                      border: '2px solid #ddd',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      margin: '0 auto'
                    }}
                  >
                    {/* 옵션 헤더 */}
                    <div style={{
                      background: '#e0e0e0',
                      padding: '8px 15px 8px 2px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      minHeight: '52px',
                      height: '52px'
                    }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        background: 'white',
                        borderRadius: '50%',
                        display: option.numberEnabled ? 'flex' : 'none',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: `${option.numberSize}px`,
                        fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                        fontWeight: option.numberBold ? 900 : 700,
                        fontStyle: option.numberItalic ? 'italic' : 'normal',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.20)',
                        flexShrink: 0,
                        letterSpacing: '-0.5px',
                        color: option.numberColor || '#000000',
                        marginTop: '-1px',
                        textShadow: option.numberOutline ? 
                          generateTextOutline(option.numberOutlineColor, option.numberOutlineWidth || 1)
                          : 'none'
                      }}>
                        {option.number}
                      </div>
                      <div style={{ flex: 1, paddingRight: '10px', display: 'flex', alignItems: 'center', marginTop: '2px', fontSize: `${option.fontSize}px`, fontFamily: "'Gmarket Sans', sans-serif", fontWeight: option.titleBold ? 900 : 500, fontStyle: option.titleItalic ? 'italic' : 'normal', transform: 'scaleX(0.95)', transformOrigin: option.titleAlign === 'left' ? 'left' : option.titleAlign === 'right' ? 'right' : 'center', textAlign: option.titleAlign, color: option.titleColor || '#000000', textShadow: option.titleOutline ? generateTextOutline(option.titleOutlineColor, option.titleOutlineWidth || 1) : 'none' }}>
                        <div style={{ width: '100%', textAlign: option.titleAlign }}>
                          {option.title}
                        </div>
                      </div>
                    </div>
                    
                    {/* 사양 리스트 */}
                    {option.specsEnabled && option.specs.length > 0 && (
                      <div style={{
                        padding: 0,
                        fontSize: `${option.specsFontSize}px`,
                        lineHeight: 1,
                        borderTop: '1px solid #ddd'
                      }}>
                        {option.specs.map((spec) => (
                          <div 
                            key={spec.id} 
                            style={{
                              borderBottom: '1px solid #ddd',
                              color: option.specsColor
                            }}
                          >
                            <div style={{
                              padding: '8px 20px 4px 20px',
                              fontFamily: "'Gmarket Sans', sans-serif",
                              fontWeight: 500,
                              transform: 'scaleX(0.95)',
                              transformOrigin: option.specsAlign === 'left' ? 'left' : option.specsAlign === 'right' ? 'right' : 'center',
                              textAlign: option.specsAlign
                            }}>
                              {spec.text}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* 이미지 영역 */}
                    {(option.image || option.circleOverlay.enabled || option.textBox.enabled) && (
                      <div 
                        className="relative group"
                        style={{ 
                          flex: 1,
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minHeight: 0
                        }}
                      >
                        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {option.image && (
                            <img 
                              src={option.image} 
                              alt="미리보기" 
                              className="cursor-move select-none"
                              style={{
                                width: '100%',
                                height: '100%',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain',
                                position: 'absolute',
                                left: `${option.imagePosition.x}%`,
                                top: `${option.imagePosition.y}%`,
                                transform: `translate(-50%, -50%) scale(${(option.imagePosition.scale || 100) / 100})`,
                                zIndex: option.circleOverlay.enabled && option.circleOverlay.zIndex === 'front' ? 1 : 2
                              }}
                              draggable="false"
                              onMouseDown={(e) => startDrag(option.id, 'main', e)}
                            />
                          )}
                          {option.circleOverlay.enabled && (
                            <div 
                              style={{
                                position: 'absolute',
                                left: `${option.circleOverlay.position.x}%`,
                                top: `${option.circleOverlay.position.y}%`,
                                width: `${option.circleOverlay.size.width}px`,
                                height: `${option.circleOverlay.size.height}px`,
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '3px solid #ddd',
                                backgroundColor: option.circleOverlay.backgroundColor || '#FFFFFF',
                                zIndex: option.circleOverlay.zIndex === 'front' ? 2 : 1,
                                transform: 'translate(-50%, -50%)',
                                cursor: 'move'
                              }}
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                startDrag(option.id, 'circle', e);
                              }}
                            >
                              {option.circleOverlay.image && (
                                <img 
                                  src={option.circleOverlay.image}
                                  alt="원형 미리보기"
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    position: 'absolute',
                                    left: `${option.circleOverlay.innerImage?.position?.x || 50}%`,
                                    top: `${option.circleOverlay.innerImage?.position?.y || 50}%`,
                                    transform: `translate(-50%, -50%) scale(${(option.circleOverlay.innerImage?.scale || 100) / 100})`,
                                    pointerEvents: 'none'
                                  }}
                                  draggable="false"
                                />
                              )}
                            </div>
                          )}
                          {option.textBox.enabled && (
                            <div 
                              className="cursor-move select-none"
                              style={{
                                position: 'absolute',
                                left: `${option.textBox.position?.x || 50}%`,
                                top: `${option.textBox.position?.y || 20}%`,
                                transform: 'translate(-50%, -50%)',
                                fontSize: `${option.textBox.fontSize}px`,
                                color: option.textBox.text ? option.textBox.color : '#cccccc',
                                fontFamily: "'Gmarket Sans', sans-serif",
                                fontWeight: option.textBox.bold ? 900 : 500,
                                fontStyle: option.textBox.italic ? 'italic' : 'normal',
                                whiteSpace: 'nowrap',
                                zIndex: 3,
                                textShadow: option.textBox.outline && option.textBox.text ? 
                                  generateTextOutline(option.textBox.outlineColor, option.textBox.outlineWidth || 1)
                                  : 'none'
                              }}
                              onMouseDown={(e) => startDrag(option.id, 'text', e)}
                            >
                              {option.textBox.text || '문자 입력'}
                            </div>
                          )}
                        </div>
                        {option.image && (
                          <button
                            onClick={() => deleteImage(option.id)}
                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg z-10"
                            title="이미지 삭제"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* 이미지 조정 컨트롤 */}
                {option.image && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="text-xs font-semibold text-gray-700">메인 이미지 조정</div>
                      <div className="text-xs text-gray-500">💡 이미지를 드래그하여 위치를 조정하세요</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">가로 위치: {Math.round(option.imagePosition.x)}%</label>
                        <div className="flex gap-2 items-center">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={option.imagePosition.x}
                            onChange={(e) => updateOption(option.id, 'imagePosition', { ...option.imagePosition, x: parseFloat(e.target.value) })}
                            className="flex-1"
                          />
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={Math.round(option.imagePosition.x)}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0;
                              updateOption(option.id, 'imagePosition', { ...option.imagePosition, x: Math.max(0, Math.min(100, val)) });
                            }}
                            className="w-14 px-2 py-1 border rounded text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">세로 위치: {Math.round(option.imagePosition.y)}%</label>
                        <div className="flex gap-2 items-center">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={option.imagePosition.y}
                            onChange={(e) => updateOption(option.id, 'imagePosition', { ...option.imagePosition, y: parseFloat(e.target.value) })}
                            className="flex-1"
                          />
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={Math.round(option.imagePosition.y)}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0;
                              updateOption(option.id, 'imagePosition', { ...option.imagePosition, y: Math.max(0, Math.min(100, val)) });
                            }}
                            className="w-14 px-2 py-1 border rounded text-xs"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">이미지 크기: {option.imagePosition.scale || 100}%</label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="range"
                          min="50"
                          max="400"
                          value={option.imagePosition.scale || 100}
                          onChange={(e) => updateOption(option.id, 'imagePosition', { ...option.imagePosition, scale: parseInt(e.target.value) })}
                          className="flex-1"
                        />
                        <input
                          type="number"
                          min="50"
                          max="400"
                          value={option.imagePosition.scale || 100}
                          onChange={(e) => {
                            const val = e.target.value === '' ? 100 : parseInt(e.target.value);
                            updateOption(option.id, 'imagePosition', { ...option.imagePosition, scale: val });
                          }}
                          onBlur={(e) => {
                            const val = parseInt(e.target.value) || 100;
                            updateOption(option.id, 'imagePosition', { ...option.imagePosition, scale: Math.max(50, Math.min(400, val)) });
                          }}
                          className="w-16 px-2 py-1 border rounded text-xs"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() => updateOption(option.id, 'imagePosition', { ...option.imagePosition, x: 50, y: 50 })}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        위치 리셋
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() => updateOption(option.id, 'imagePosition', { ...option.imagePosition, scale: 100 })}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        크기 리셋
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProductOptionsEditor;