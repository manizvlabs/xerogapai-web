export interface AssessmentAnswer {
  questionId: number;
  answer: string | string[];
  score: number;
}

export interface AssessmentResults {
  overallScore: number;
  readinessLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  categoryScores: {
    technicalReadiness: number;
    businessReadiness: number;
    budgetReadiness: number;
    timelineReadiness: number;
  };
  recommendedServices: Array<{
    service: string;
    priority: 'high' | 'medium' | 'low';
    reasoning: string;
    estimatedROI: string;
    implementationTime: string;
  }>;
  actionPlan: Array<{
    phase: string;
    timeframe: string;
    actions: string[];
    successMetrics: string[];
  }>;
  insights: Array<{
    type: 'strength' | 'opportunity' | 'risk';
    title: string;
    description: string;
    recommendation: string;
  }>;
}

export class AssessmentEngine {
  static calculateDetailedResults(answers: Record<number, any>): AssessmentResults {
    const categoryScores = this.calculateCategoryScores(answers);
    const overallScore = this.calculateOverallScore(categoryScores);
    const readinessLevel = this.determineReadinessLevel(overallScore);
    const recommendedServices = this.generateServiceRecommendations(answers, categoryScores);
    const actionPlan = this.generateActionPlan(readinessLevel, answers);
    const insights = this.generateInsights(answers, categoryScores);

    return {
      overallScore,
      readinessLevel,
      categoryScores,
      recommendedServices,
      actionPlan,
      insights
    };
  }

  private static calculateCategoryScores(answers: Record<number, any>) {
    // Company size & current digitization level
    const technicalReadiness = this.calculateTechnicalReadiness(answers);

    // Business processes & automation needs
    const businessReadiness = this.calculateBusinessReadiness(answers);

    // Budget & timeline factors
    const budgetReadiness = this.calculateBudgetReadiness(answers);
    const timelineReadiness = this.calculateTimelineReadiness(answers);

    return {
      technicalReadiness,
      businessReadiness,
      budgetReadiness,
      timelineReadiness
    };
  }

  private static calculateTechnicalReadiness(answers: Record<number, any>): number {
    let score = 0;

    // Company size impact
    const companySize = answers[1];
    if (companySize === 'startup') score += 20;
    else if (companySize === 'small') score += 15;
    else if (companySize === 'medium') score += 10;
    else if (companySize === 'large') score += 5;

    // Current digitization level
    const digitizationLevel = answers[2];
    if (digitizationLevel === 'advanced') score += 30;
    else if (digitizationLevel === 'moderate') score += 20;
    else if (digitizationLevel === 'basic') score += 10;
    else if (digitizationLevel === 'minimal') score += 5;

    // Current tools/platforms
    const currentTools = answers[7] || [];
    if (Array.isArray(currentTools)) {
      if (currentTools.includes('crm')) score += 10;
      if (currentTools.includes('communication')) score += 8;
      if (currentTools.includes('productivity')) score += 12;
      if (currentTools.includes('accounting')) score += 15;
      if (currentTools.includes('custom')) score += 20;
      if (currentTools.includes('none')) score -= 10;
    }

    return Math.min(100, Math.max(0, score));
  }

  private static calculateBusinessReadiness(answers: Record<number, any>): number {
    let score = 0;

    // Areas needing automation
    const automationAreas = answers[3] || [];
    if (Array.isArray(automationAreas)) {
      if (automationAreas.includes('customer_service')) score += 15;
      if (automationAreas.includes('sales')) score += 12;
      if (automationAreas.includes('operations')) score += 18;
      if (automationAreas.includes('marketing')) score += 10;
      if (automationAreas.includes('finance')) score += 20;
      if (automationAreas.includes('hr')) score += 8;
    }

    // Biggest operational challenge
    const mainChallenge = answers[6];
    if (mainChallenge === 'efficiency') score += 15;
    else if (mainChallenge === 'customer') score += 12;
    else if (mainChallenge === 'growth') score += 18;
    else if (mainChallenge === 'costs') score += 20;
    else if (mainChallenge === 'compliance') score += 10;

    // AI use case interest
    const aiInterest = answers[9];
    if (aiInterest === 'automation') score += 20;
    else if (aiInterest === 'analytics') score += 18;
    else if (aiInterest === 'sales') score += 15;
    else if (aiInterest === 'chatbots') score += 12;
    else if (aiInterest === 'content') score += 10;

    return Math.min(100, Math.max(0, score));
  }

  private static calculateBudgetReadiness(answers: Record<number, any>): number {
    const budgetRange = answers[4];

    if (budgetRange === 'high') return 90;
    if (budgetRange === 'medium') return 75;
    if (budgetRange === 'low') return 60;
    if (budgetRange === 'minimal') return 40;

    return 50;
  }

  private static calculateTimelineReadiness(answers: Record<number, any>): number {
    const timeline = answers[8];

    if (timeline === 'immediate') return 95;
    if (timeline === 'soon') return 80;
    if (timeline === 'quarter') return 65;
    if (timeline === 'year') return 50;

    return 60;
  }

  private static calculateOverallScore(categoryScores: any): number {
    const weights = {
      technicalReadiness: 0.25,
      businessReadiness: 0.35,
      budgetReadiness: 0.20,
      timelineReadiness: 0.20
    };

    return Math.round(
      categoryScores.technicalReadiness * weights.technicalReadiness +
      categoryScores.businessReadiness * weights.businessReadiness +
      categoryScores.budgetReadiness * weights.budgetReadiness +
      categoryScores.timelineReadiness * weights.timelineReadiness
    );
  }

  private static determineReadinessLevel(score: number): AssessmentResults['readinessLevel'] {
    if (score >= 85) return 'expert';
    if (score >= 70) return 'advanced';
    if (score >= 55) return 'intermediate';
    return 'beginner';
  }

  private static generateServiceRecommendations(
    answers: Record<number, any>,
    categoryScores: any
  ): AssessmentResults['recommendedServices'] {
    const recommendations: AssessmentResults['recommendedServices'] = [];

    const automationAreas = answers[3] || [];
    const budgetRange = answers[4];
    const timeline = answers[8];

    // WhatsApp CX - High priority for customer service focus
    if (Array.isArray(automationAreas) && automationAreas.includes('customer_service')) {
      recommendations.push({
        service: 'AI Multi-Channel Support Copilot',
        priority: 'high',
        reasoning: 'Your focus on customer service makes WhatsApp automation a perfect fit',
        estimatedROI: '300-500% improvement in response times',
        implementationTime: '1-2 weeks'
      });
    }

    // VyaptIX AI - High priority for operations focus
    if (Array.isArray(automationAreas) && automationAreas.includes('operations')) {
      recommendations.push({
        service: 'AI-Powered Workflow Automation',
        priority: 'high',
        reasoning: 'Operations automation will streamline your core business processes',
        estimatedROI: '40% reduction in manual tasks',
        implementationTime: '2-4 weeks'
      });
    }

    // Enterprise Copilots - Medium priority for knowledge management
    if (categoryScores.technicalReadiness > 70) {
      recommendations.push({
        service: 'Enterprise Knowledge Copilots',
        priority: 'medium',
        reasoning: 'Your technical readiness makes enterprise AI solutions viable',
        estimatedROI: '75% faster knowledge access',
        implementationTime: '4-6 weeks'
      });
    }

    // Sales Automation - Based on sales focus
    if (Array.isArray(automationAreas) && automationAreas.includes('sales')) {
      recommendations.push({
        service: 'AI Sales Insights & Automation',
        priority: 'medium',
        reasoning: 'Sales automation will enhance lead generation and conversion',
        estimatedROI: '150% increase in qualified leads',
        implementationTime: '3-5 weeks'
      });
    }

    // Contact Center AI - Based on customer service needs
    if (Array.isArray(automationAreas) && automationAreas.includes('customer_service') && categoryScores.businessReadiness > 60) {
      recommendations.push({
        service: 'Contact Center QA & Coaching',
        priority: 'medium',
        reasoning: 'Advanced contact center AI will improve quality and efficiency',
        estimatedROI: '35% improvement in call quality scores',
        implementationTime: '6-8 weeks'
      });
    }

    // Compliance solutions - Based on compliance requirements
    const complianceNeeds = answers[10] || [];
    if (Array.isArray(complianceNeeds) && (complianceNeeds.includes('gdpr') || complianceNeeds.includes('dpdp'))) {
      recommendations.push({
        service: 'AI Data Privacy & Compliance',
        priority: 'high',
        reasoning: 'Your compliance requirements make automated compliance solutions essential',
        estimatedROI: '80% reduction in compliance overhead',
        implementationTime: '4-6 weeks'
      });
    }

    // Sort by priority
    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  private static generateActionPlan(
    readinessLevel: AssessmentResults['readinessLevel'],
    answers: Record<number, any>
  ): AssessmentResults['actionPlan'] {
    const basePlan: AssessmentResults['actionPlan'] = [];

    switch (readinessLevel) {
      case 'expert':
        basePlan.push(
          {
            phase: 'Immediate Implementation (Week 1-2)',
            timeframe: '2 weeks',
            actions: [
              'Select and implement pilot AI solution',
              'Set up monitoring and analytics',
              'Train key team members',
              'Establish governance framework'
            ],
            successMetrics: [
              'AI solution deployed successfully',
              'Team adoption rate > 80%',
              'Initial ROI metrics established'
            ]
          },
          {
            phase: 'Scaling & Optimization (Month 1-3)',
            timeframe: '2 months',
            actions: [
              'Expand to additional use cases',
              'Optimize AI performance based on data',
              'Scale to additional team members',
              'Establish continuous improvement process'
            ],
            successMetrics: [
              'Multiple AI solutions deployed',
              'Measurable efficiency improvements',
              'Positive user feedback and adoption'
            ]
          }
        );
        break;

      case 'advanced':
        basePlan.push(
          {
            phase: 'Foundation & Pilot (Week 1-4)',
            timeframe: '4 weeks',
            actions: [
              'Complete technical assessment',
              'Select primary AI solution for pilot',
              'Set up data infrastructure',
              'Train implementation team'
            ],
            successMetrics: [
              'Technical requirements documented',
              'Pilot project scope defined',
              'Team readiness assessed'
            ]
          },
          {
            phase: 'Implementation & Scaling (Month 1-3)',
            timeframe: '3 months',
            actions: [
              'Deploy pilot solution',
              'Monitor and optimize performance',
              'Expand to additional processes',
              'Build internal AI capabilities'
            ],
            successMetrics: [
              'Pilot successfully deployed',
              'Key performance metrics tracked',
              'Expansion roadmap created'
            ]
          }
        );
        break;

      case 'intermediate':
        basePlan.push(
          {
            phase: 'Readiness Building (Week 1-6)',
            timeframe: '6 weeks',
            actions: [
              'Conduct comprehensive digital audit',
              'Address technical gaps',
              'Build data management capabilities',
              'Identify quick-win opportunities'
            ],
            successMetrics: [
              'Digital maturity assessment completed',
              'Technical gaps identified and prioritized',
              'Quick-win projects identified'
            ]
          },
          {
            phase: 'Implementation Preparation (Month 2-4)',
            timeframe: '2 months',
            actions: [
              'Implement foundational automation',
              'Pilot AI solutions',
              'Build AI skills and knowledge',
              'Establish governance framework'
            ],
            successMetrics: [
              'Foundational automation in place',
              'First AI solution successfully deployed',
              'Team AI literacy improved'
            ]
          }
        );
        break;

      case 'beginner':
        basePlan.push(
          {
            phase: 'Foundation Building (Month 1-2)',
            timeframe: '2 months',
            actions: [
              'Conduct business process audit',
              'Implement basic digitization',
              'Build data collection systems',
              'Start AI awareness training'
            ],
            successMetrics: [
              'Current state documented',
              'Basic digitization completed',
              'Team AI awareness increased'
            ]
          },
          {
            phase: 'AI Readiness Preparation (Month 3-6)',
            timeframe: '3 months',
            actions: [
              'Address identified gaps',
              'Implement intermediate automation',
              'Build technical infrastructure',
              'Develop AI implementation strategy'
            ],
            successMetrics: [
              'Major gaps addressed',
              'Technical foundation established',
              'AI implementation roadmap created'
            ]
          }
        );
        break;
    }

    return basePlan;
  }

  private static generateInsights(
    answers: Record<number, any>,
    categoryScores: any
  ): AssessmentResults['insights'] {
    const insights: AssessmentResults['insights'] = [];

    // Technical readiness insights
    if (categoryScores.technicalReadiness > 80) {
      insights.push({
        type: 'strength',
        title: 'Strong Technical Foundation',
        description: 'Your current technical infrastructure provides an excellent foundation for AI implementation.',
        recommendation: 'Focus on selecting the right AI solutions that complement your existing tools.'
      });
    } else if (categoryScores.technicalReadiness < 50) {
      insights.push({
        type: 'opportunity',
        title: 'Technical Infrastructure Opportunity',
        description: 'There are opportunities to strengthen your technical foundation before full AI implementation.',
        recommendation: 'Consider addressing basic digitization and data management needs first.'
      });
    }

    // Business readiness insights
    if (categoryScores.businessReadiness > 75) {
      insights.push({
        type: 'strength',
        title: 'Clear Business Focus',
        description: 'You have well-defined business processes and clear automation opportunities.',
        recommendation: 'Leverage your business insights to prioritize high-impact AI implementations.'
      });
    }

    // Budget insights
    const budgetRange = answers[4];
    if (budgetRange === 'high') {
      insights.push({
        type: 'strength',
        title: 'Strong Budget Position',
        description: 'Your budget allows for comprehensive AI implementation and advanced solutions.',
        recommendation: 'Consider enterprise-grade solutions with full customization and support.'
      });
    } else if (budgetRange === 'minimal') {
      insights.push({
        type: 'opportunity',
        title: 'Budget Optimization Focus',
        description: 'Start with cost-effective solutions and scale as you see results.',
        recommendation: 'Focus on high-ROI, low-complexity solutions initially.'
      });
    }

    // Timeline insights
    const timeline = answers[8];
    if (timeline === 'immediate') {
      insights.push({
        type: 'opportunity',
        title: 'Urgent Implementation Need',
        description: 'Your timeline suggests immediate automation needs.',
        recommendation: 'Consider quick-win solutions that can be implemented rapidly.'
      });
    }

    // Compliance insights
    const complianceNeeds = answers[10] || [];
    if (Array.isArray(complianceNeeds) && (complianceNeeds.includes('gdpr') || complianceNeeds.includes('dpdp'))) {
      insights.push({
        type: 'risk',
        title: 'Compliance Requirements',
        description: 'Your compliance needs require careful consideration in AI implementation.',
        recommendation: 'Ensure AI solutions include compliance features and audit capabilities.'
      });
    }

    return insights;
  }
}
