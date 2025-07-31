document.addEventListener('DOMContentLoaded', () => {

    const quotationData = {
        starter: {
            serviceFee: 30000,
            platformCosts: {
                total: 18000,
                breakdown: [
                    { name: 'Shopify Basic Plan (3 months)', price: 6000 },
                    { name: 'Domain & SSL', price: 2000 },
                    { name: 'Premium Theme', price: 10000 }
                ]
            },
            features: [
                'Basic Shopify Theme Customization',
                'Product Upload (up to 30 items)',
                'Essential Policy Pages',
                'Payment Gateway Integration',
                '2 Months of Post-Launch Support'
            ]
        },
        growth: {
            serviceFee: 45000,
            platformCosts: {
                total: 18000,
                breakdown: [
                    { name: 'Shopify Basic Plan (3 months)', price: 6000 },
                    { name: 'Domain & SSL', price: 2000 },
                    { name: 'Premium Theme', price: 10000 }
                ]
            },
            features: [
                'Premium Theme Customization',
                'Product Upload (up to 60 items)',
                'Email Automation Setup',
                'Blog & SEO Integration',
                '2 Months of Post-Launch Support'
            ]
        },
        'full-suite': {
            serviceFee: 60000,
            platformCosts: {
                total: 18000,
                breakdown: [
                    { name: 'Shopify Basic Plan (3 months)', price: 6000 },
                    { name: 'Domain & SSL', price: 2000 },
                    { name: 'Premium Theme', price: 10000 }
                ]
            },
            features: [
                'Fully Custom Website Design',
                'Product Upload (up to 75 items)',
                'WhatsApp & Email Automation',
                'Full Brand Assets (Figma/Canva)',
                '2 Months of Dual Support Channels'
            ]
        }
    };

    const planCards = document.querySelectorAll('.plan-card');
    const serviceFeeDisplay = document.getElementById('service-fee-display');
    const platformCostsDisplay = document.getElementById('platform-costs-display');
    const grandTotalDisplay = document.getElementById('grand-total-display');
    const planDetailsContent = document.getElementById('plan-details-content');
    const platformCostsDetails = document.getElementById('platform-costs-details');
    const issueDateDisplay = document.getElementById('issue-date');
    const clientCompanyDisplay = document.getElementById('client-company-display');
    const clientNameDisplay = document.getElementById('client-name-display');


    const getUrlParam = (name) => {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        const results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    const companyNameParam = getUrlParam('company_name');
    const clientNameParam = getUrlParam('client_name');

    if (companyNameParam) {
        clientCompanyDisplay.textContent = companyNameParam;
    }
    if (clientNameParam) {
        clientNameDisplay.textContent = clientNameParam;
    }


    const today = new Date();
    issueDateDisplay.textContent = today.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    const updatePlanDetails = (planName) => {
        const plan = quotationData[planName];
        if (!plan) return;

        // Use direct textContent update for bug-free reliability
        serviceFeeDisplay.textContent = `₹${plan.serviceFee.toLocaleString('en-IN')}`;
        platformCostsDisplay.textContent = `₹${plan.platformCosts.total.toLocaleString('en-IN')}`;
        grandTotalDisplay.textContent = `₹${(plan.serviceFee + plan.platformCosts.total).toLocaleString('en-IN')}`;
    
        let featuresHtml = '<h2>Plan Features</h2><ul class="features-list">';
        plan.features.forEach(feature => {
            featuresHtml += `<li>${feature}</li>`;
        });
        featuresHtml += '</ul>';
        planDetailsContent.innerHTML = featuresHtml;

        let costsHtml = '';
        plan.platformCosts.breakdown.forEach(item => {
            costsHtml += `<div class="cost-item">${item.name}<span>₹${item.price.toLocaleString('en-IN')}</span></div>`;
        });
        platformCostsDetails.innerHTML = costsHtml;
    };

    planCards.forEach(card => {
        card.addEventListener('click', () => {
            planCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            const plan = card.getAttribute('data-plan');
            updatePlanDetails(plan);
        });
    });

    const accordionToggle = document.querySelector('.accordion-toggle');
    const accordionContent = document.getElementById(accordionToggle.dataset.target);
    accordionToggle.addEventListener('click', () => {
        accordionContent.classList.toggle('open');
    });

    const fadeInElements = document.querySelectorAll('.fade-in');
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeInElements.forEach(el => {
        fadeInObserver.observe(el);
    });

    updatePlanDetails('starter');

    const downloadBtn = document.getElementById('download-pdf-btn');
    downloadBtn.addEventListener('click', () => {
        alert('Download functionality would be implemented here using a library like html2pdf.js.');
    });
});