//
//  HomeViewController.swift
//  issue-tracker
//
//  Created by SONG on 2023/05/09.
//

import UIKit

class HomeViewController: UITabBarController {
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        if let tabBar = Bundle.main.loadNibNamed("IssueTabView", owner: self, options: nil)?.first as? UITabBarController {
                self.viewControllers = tabBar.viewControllers
            }
    }

}
