//
//  IssueListDTO.swift
//  IssueTracker
//
//  Created by Effie on 2023/05/15.
//

import Foundation

struct IssueListDTO: Codable {
   struct Issue: Codable {
      let issueId: Int
      var title: String
      let content: String
      let userName: String
      let profileUrl: String?
      var open: Bool
      let createdAt: String
      let closedAt: String?
      let milestoneName: String?
      let labelList: [Label]
   }
   
   struct User: Codable, Hashable {
      let userId: Int
      let userName: String
      let profileUrl: String?
   }
   
   struct Label: Codable {
      let labelId: Int
      let labelName: String
      let backgroundColor: String
      let fontColor: String
      let description: String?
   }
   
   struct Milestone: Codable {
      let milestoneId: Int
      let milestoneName: String?
      let description: String?
   }
   
   let issues: [Issue]
   let userList: [User]
   let labelList: [Label]
   let milestoneList: [Milestone]
   
   let countAllLabels: Int
   let countAllMilestones: Int
   let countOpenedIssues: Int
   let countClosedIssues: Int
   
   init() {
      self.issues = []
      self.userList = []
      self.labelList = []
      self.milestoneList = []
      self.countAllLabels = 0
      self.countAllMilestones = 0
      self.countOpenedIssues = 0
      self.countClosedIssues = 0
   }
}
